import fs from 'fs';
import { get_replay_frames_data } from '@rlrml/subtr-actor';

async function test() {
    const res = await fetch('https://media.githubusercontent.com/media/jjbott/boxcars/master/assets/replays/soccar_rumble.replay');
    const arrayBuffer = await res.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);
    
    console.log("Parsing frames...");
    try {
        const framesData = get_replay_frames_data(uint8);
        const playerStatsHeader = framesData.meta.all_headers.find(h => h[0] === 'PlayerStats');
        console.log(JSON.stringify(playerStatsHeader, null, 2));
    } catch(e) {
        console.error("Frame parsing failed:", e.message);
    }
}
test();
