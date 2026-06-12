import fs from 'fs';
import init, { parse_replay } from '@rlrml/subtr-actor';

async function test() {
    try {
        const wasmBuffer = fs.readFileSync('node_modules/@rlrml/subtr-actor/rl_replay_subtr_actor_bg.wasm');
        await init(wasmBuffer);
        
        const res = await fetch('https://media.githubusercontent.com/media/jjbott/boxcars/master/assets/replays/soccar_rumble.replay');
        const arrayBuffer = await res.arrayBuffer();
        const uint8 = new Uint8Array(arrayBuffer);
        
        const replayData = parse_replay(uint8);
        
        // Find PlayerStats
        const playerStats = replayData.properties.find(h => h[0] === 'PlayerStats');
        console.log(JSON.stringify(playerStats, null, 2));
    } catch(e) {
        console.error("Frame parsing failed:", e.stack);
    }
}
test();
