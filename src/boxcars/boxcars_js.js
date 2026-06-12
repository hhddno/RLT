
let imports = {};
const __exports = {};
imports['__wbindgen_placeholder__'] = __exports;
let wasm;
const TextDecoder = window.TextDecoder;
const TextEncoder = window.TextEncoder;

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

__exports.set_panic_hook = function() {
    wasm.set_panic_hook();
};

/**
 * @enum {0 | 1 | 2}
 */
export const CrcCheck = Object.freeze({
    Always: 0, "0": "Always",
    Never: 1, "1": "Never",
    OnError: 2, "2": "OnError",
});
__exports.CrcCheck = CrcCheck;
/**
 * @enum {0 | 1 | 2}
 */
export const NetworkParse = Object.freeze({
    Always: 0, "0": "Always",
    Never: 1, "1": "Never",
    IgnoreOnError: 2, "2": "IgnoreOnError",
});
__exports.NetworkParse = NetworkParse;

const BoxcarsParserFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_boxcarsparser_free(ptr >>> 0, 1));

class BoxcarsParser {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BoxcarsParser.prototype);
        obj.__wbg_ptr = ptr;
        BoxcarsParserFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BoxcarsParserFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_boxcarsparser_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.boxcarsparser_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        BoxcarsParserFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {CrcCheck} check
     * @returns {BoxcarsParser}
     */
    setCrcCheck(check) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.boxcarsparser_setCrcCheck(ptr, check);
        return BoxcarsParser.__wrap(ret);
    }
    /**
     * @param {NetworkParse} parse
     * @returns {BoxcarsParser}
     */
    setNetworkParse(parse) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.boxcarsparser_setNetworkParse(ptr, parse);
        return BoxcarsParser.__wrap(ret);
    }
    /**
     * @returns {Replay}
     */
    parse() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.boxcarsparser_parse(ptr);
        return ret;
    }
}
export { BoxcarsParser };
__exports.BoxcarsParser = BoxcarsParser;

__exports.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
};

__exports.__wbg_new_8a6f238a6ece86ea = function() {
    const ret = new Error();
    return ret;
};

__exports.__wbg_parse_cf02c1c0d273db9c = function(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
        return ret;
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
};

__exports.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
    const ret = arg1.stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

__exports.__wbindgen_init_externref_table = function() {
    const table = wasm.__wbindgen_export_3;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

__exports.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

import wasmUrl from './boxcars_js_bg.wasm?url';

export async function initBoxcars() {
    if (wasm) return;
    const response = await fetch(wasmUrl);
    const bytes = await response.arrayBuffer();
    const wasmModule = await WebAssembly.compile(bytes);
    const wasmInstance = await WebAssembly.instantiate(wasmModule, imports);
    wasm = wasmInstance.exports;
    __exports.__wasm = wasm;
    wasm.__wbindgen_start();
}

