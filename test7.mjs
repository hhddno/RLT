import boxcars from 'boxcars.js';
import fs from 'fs';

async function test() {
    const res = await fetch('https://media.githubusercontent.com/media/jjbott/boxcars/master/assets/replays/soccar_rumble.replay');
    const arrayBuffer = await res.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);
    
    try {
        console.log(typeof boxcars.BoxcarsParser);
        console.log(typeof boxcars.__wasm);
        // Maybe BoxcarsParser is a WASM generated struct?
    } catch(e) {
        console.error("Frame parsing failed:", e);
    }
}
test();
