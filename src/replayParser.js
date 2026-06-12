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
                    let props = replayData.properties || {};
                    
                    // Reconstruct properties from subtr-actor's meta if available
                    if (framesData && framesData.meta && framesData.meta.all_headers) {
                        const newProps = {};
                        framesData.meta.all_headers.forEach(h => {
                            const key = h[0];
                            const val = h[1];
                            if (val) {
                                if (val.Int !== undefined) newProps[key] = val.Int;
                                else if (val.Str !== undefined) newProps[key] = val.Str;
                                else if (val.Float !== undefined) newProps[key] = val.Float;
                                else if (val.Name !== undefined) newProps[key] = val.Name;
                                else if (val.QWord !== undefined) newProps[key] = val.QWord;
                                else if (val.Bool !== undefined) newProps[key] = val.Bool;
                                else newProps[key] = val;
                            }
                        });
                        props = newProps;
                    }
                    
                    // Safely extract scores, boxcars sometimes nests them in 'int'
                    const getInt = (obj) => typeof obj === 'object' && obj !== null ? (obj.int || obj.Int || obj.integer || 0) : (obj || 0);
                    
                    const teamBlueScore = getInt(props.Team0Score);
                    const teamOrangeScore = getInt(props.Team1Score);
                    
                    const matchGuid = props.Id || props.MatchType || 'Inconnu';
                    const matchDate = props.Date || new Date().toLocaleDateString();
                    
                    resolve({
                        filename: file.name,
                        size: fileSizeMb + ' MB',
                        matchGuid: matchGuid,
                        date: matchDate,
                        teamBlue: { name: 'Équipe Bleue', score: teamBlueScore },
                        teamOrange: { name: 'Équipe Orange', score: teamOrangeScore },
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
