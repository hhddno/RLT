import fs from 'fs';
import { get_replay_frames_data } from '@rlrml/subtr-actor';

async function test() {
    const res = await fetch('https://media.githubusercontent.com/media/jjbott/boxcars/master/assets/replays/soccar_rumble.replay');
    const arrayBuffer = await res.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);
    
    try {
        const framesData = get_replay_frames_data(uint8);
        console.log(JSON.stringify(framesData.boost_pads[0], null, 2));
    } catch(e) {
        console.error("Frame parsing failed:", e.message);
    }
}
test();
