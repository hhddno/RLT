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
                    // Boxcars puts header properties in properties object
                    const props = replayData.properties || {};
                    const teamBlueScore = props.Team0Score || 0;
                    const teamOrangeScore = props.Team1Score || 0;
                    
                    resolve({
                        filename: file.name,
                        size: fileSizeMb + ' MB',
                        matchGuid: props.MatchType || props.Id || 'Inconnu',
                        date: props.Date || new Date().toLocaleDateString(),
                        teamBlue: { name: 'Équipe Bleue', score: teamBlueScore },
                        teamOrange: { name: 'Équipe Orange', score: teamOrangeScore },
                        // Check subtr-actor framesData first, otherwise fallback to boxcars raw network_frames
                        framesCount: framesData ? Object.keys(framesData).length : (replayData.network_frames ? replayData.network_frames.frames.length : 0),
                        raw: replayData,
                        framesData: framesData
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
