import { BoxcarsParser, CrcCheck, NetworkParse, initBoxcars } from './boxcars/boxcars_js.js';

class ReplayParser {
    static async parse(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    await initBoxcars();
                    const buffer = e.target.result;
                    const uint8Array = new Uint8Array(buffer);
                    
                    // Decode using WebAssembly (boxcars.js)
                    const parser = new BoxcarsParser(uint8Array);
                    parser.setCrcCheck(CrcCheck.Never); // Speed up parsing by skipping CRC
                    parser.setNetworkParse(NetworkParse.Always); // Parse the actual frames!
                    
                    // The WASM parser returns a full JSON object of the replay
                    const replayData = parser.parse();
                    parser.free(); // Free the WASM memory
                    
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
                        // Now we also have the network_frames!
                        framesCount: replayData.network_frames ? replayData.network_frames.frames.length : 0,
                        raw: replayData
                    });
                } catch (error) {
                    reject(new Error("Erreur WebAssembly (Boxcars) : " + error.message));
                }
            };
            reader.onerror = () => reject(new Error("Erreur de lecture du fichier."));
            reader.readAsArrayBuffer(file);
        });
    }
}

// Make it globally available for the existing app.js routing structure
window.ReplayParser = ReplayParser;
