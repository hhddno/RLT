import initSubtrActor, { parse_replay, get_replay_frames_data } from '@rlrml/subtr-actor';
import subtrWasmUrl from '@rlrml/subtr-actor/rl_replay_subtr_actor_bg.wasm?url';

let subtrInitialized = false;

class ReplayParser {
    static async parse(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    if (!subtrInitialized) {
                        await initSubtrActor(subtrWasmUrl);
                        subtrInitialized = true;
                    }
                    
                    const buffer = e.target.result;
                    const uint8Array = new Uint8Array(buffer);
                    console.log('Replay file loaded, size:', uint8Array.length, 'bytes');
                    if (uint8Array.length === 0) throw new Error("Fichier vide.");
                    
                    // Decode using WebAssembly (subtr-actor)
                    const replayData = parse_replay(uint8Array);
                    
                    // Try to extract frame-by-frame stats/timeline if possible
                    let framesData = null;
                    try {
                        framesData = get_replay_frames_data(uint8Array);
                    } catch (err) {
                        console.warn("Could not extract frame data:", err);
                    }
                    
                    const fileSizeMb = (file.size / (1024 * 1024)).toFixed(2);
                    
                    // Extract data from the Boxcars JSON structure
                    // Reconstruct properties from Boxcars JSON by flattening Rust enums
                    let props = {};
                    if (replayData.properties && typeof replayData.properties === 'object') {
                        const parseHeaderProp = (val) => {
                            if (!val) return null;
                            if (typeof val !== 'object') return val;
                            if (Array.isArray(val)) return val.map(v => parseHeaderProp(v));
                            
                            if (val.Int !== undefined) return val.Int;
                            if (val.int !== undefined) return val.int;
                            if (val.Str !== undefined) return val.Str;
                            if (val.str !== undefined) return val.str;
                            if (val.Float !== undefined) return val.Float;
                            if (val.float !== undefined) return val.float;
                            if (val.Name !== undefined) return typeof val.Name === 'object' ? parseHeaderProp(val.Name) : val.Name;
                            if (val.QWord !== undefined) return val.QWord;
                            if (val.Bool !== undefined) return val.Bool;
                            if (val.Byte !== undefined) return typeof val.Byte === 'object' ? val.Byte.value : val.Byte;
                            
                            if (val.Array !== undefined) return parseHeaderProp(val.Array);
                            if (val.array !== undefined) return parseHeaderProp(val.array);
                            
                            const obj = {};
                            for (const key in val) {
                                obj[key] = parseHeaderProp(val[key]);
                            }
                            return obj;
                        };

                        if (Array.isArray(replayData.properties)) {
                            // If it's an array of tuples [["Key", Value], ...]
                            if (replayData.properties.length > 0 && Array.isArray(replayData.properties[0])) {
                                replayData.properties.forEach(h => {
                                    if (Array.isArray(h) && h.length === 2) {
                                        props[h[0]] = parseHeaderProp(h[1]);
                                    }
                                });
                            } else {
                                // If it's just a regular array for some reason
                                replayData.properties.forEach((v, i) => {
                                    props[i] = parseHeaderProp(v);
                                });
                            }
                        } else {
                            // If it's an object
                            for (const key in replayData.properties) {
                                props[key] = parseHeaderProp(replayData.properties[key]);
                            }
                        }
                    }
                    
                    // Safely extract scores, boxcars sometimes nests them in 'int'
                    const getInt = (obj) => typeof obj === 'object' && obj !== null ? (obj.int || obj.Int || obj.integer || 0) : (obj || 0);
                    
                    const teamBlueScore = getInt(props.Team0Score);
                    const teamOrangeScore = getInt(props.Team1Score);
                    
                    const matchGuid = props.Id || props.MatchType || 'Inconnu';
                    const matchDate = props.Date || new Date().toLocaleDateString();
                    const mapName = props.MapName || 'Inconnu';
                    const replayName = props.ReplayName || file.name;
                    
                    resolve({
                        filename: replayName,
                        size: fileSizeMb + ' MB',
                        matchGuid: matchGuid,
                        date: matchDate,
                        mapName: mapName,
                        teamBlue: { name: props.TeamName0 || props.Team0Name || 'Équipe Bleue', score: teamBlueScore },
                        teamOrange: { name: props.TeamName1 || props.Team1Name || 'Équipe Orange', score: teamOrangeScore },
                        // Check subtr-actor framesData first, otherwise fallback to boxcars raw network_frames
                        framesCount: framesData && framesData.frame_data && framesData.frame_data.metadata_frames 
                                        ? framesData.frame_data.metadata_frames.length 
                                        : 0,
                        raw: replayData,
                        framesData: framesData,
                        props: props
                    });
                } catch (error) {
                    reject(new Error("Erreur WebAssembly (subtr-actor) : " + error.message));
                }
            };
            reader.onerror = () => reject(new Error("Erreur de lecture du fichier."));
            reader.readAsArrayBuffer(file);
        });
    }
}

// Make it globally available for the existing app.js routing structure
window.ReplayParser = ReplayParser;
