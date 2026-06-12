import fs from 'fs';
import init, { get_stats_timeline_json } from '@rlrml/subtr-actor';

async function test() {
    try {
        const wasmBuffer = fs.readFileSync('node_modules/@rlrml/subtr-actor/rl_replay_subtr_actor_bg.wasm');
        await init(wasmBuffer);
        
        const res = await fetch('https://media.githubusercontent.com/media/jjbott/boxcars/master/assets/replays/soccar_rumble.replay');
        const arrayBuffer = await res.arrayBuffer();
        const uint8 = new Uint8Array(arrayBuffer);
        
        console.log("Parsing timeline...");
        const timelineStr = get_stats_timeline_json(uint8);
        console.log("Length:", timelineStr.length);
        console.log(timelineStr.substring(0, 500));
    } catch(e) {
        console.error("Frame parsing failed:", e.stack);
    }
}
test();
