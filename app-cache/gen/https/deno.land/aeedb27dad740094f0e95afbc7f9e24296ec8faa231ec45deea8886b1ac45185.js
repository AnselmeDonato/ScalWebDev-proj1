// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
// Copyright Joyent, Inc. and Node.js contributors. All rights reserved. MIT license.
import { Writable } from "../../stream.ts";
import { toPathIfFileURL } from "../url.ts";
import { open } from "../../_fs/_fs_open.ts";
import { write } from "../../_fs/_fs_write.mjs";
import { close } from "../../_fs/_fs_close.ts";
const kFs = Symbol("kFs");
const kIsPerformingIO = Symbol("kIsPerformingIO");
const kIoDone = Symbol("kIoDone");
export class WriteStreamClass extends Writable {
    fd = null;
    path;
    flags;
    mode;
    bytesWritten = 0;
    pos = 0;
    [kFs] = {
        open,
        write
    };
    [kIsPerformingIO] = false;
    constructor(path, opts = {}){
        super(opts);
        this.path = toPathIfFileURL(path);
        this.flags = opts.flags || "w";
        this.mode = opts.mode || 0o666;
        this[kFs] = opts.fs ?? {
            open,
            write,
            close
        };
        if (opts.encoding) {
            this.setDefaultEncoding(opts.encoding);
        }
    }
    _construct(callback) {
        this[kFs].open(this.path.toString(), this.flags, this.mode, (err, fd)=>{
            if (err) {
                callback(err);
                return;
            }
            this.fd = fd;
            callback();
            this.emit("open", this.fd);
            this.emit("ready");
        });
    }
    _write(data, _encoding, cb) {
        this[kIsPerformingIO] = true;
        this[kFs].write(this.fd, data, 0, data.length, this.pos, (er, bytes)=>{
            this[kIsPerformingIO] = false;
            if (this.destroyed) {
                // Tell ._destroy() that it's safe to close the fd now.
                cb(er);
                return this.emit(kIoDone, er);
            }
            if (er) {
                return cb(er);
            }
            this.bytesWritten += bytes;
            cb();
        });
        if (this.pos !== undefined) {
            this.pos += data.length;
        }
    }
    _destroy(err, cb) {
        if (this[kIsPerformingIO]) {
            this.once(kIoDone, (er)=>closeStream(this, err || er, cb));
        } else {
            closeStream(this, err, cb);
        }
    }
}
function closeStream(// deno-lint-ignore no-explicit-any
stream, err, cb) {
    if (!stream.fd) {
        cb(err);
    } else {
        stream[kFs].close(stream.fd, (er)=>{
            cb(er || err);
        });
        stream.fd = null;
    }
}
export function WriteStream(path, opts) {
    return new WriteStreamClass(path, opts);
}
WriteStream.prototype = WriteStreamClass.prototype;
export function createWriteStream(path, opts) {
    return new WriteStreamClass(path, opts);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjEzMi4wL25vZGUvaW50ZXJuYWwvZnMvc3RyZWFtcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIHRoZSBEZW5vIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIE1JVCBsaWNlbnNlLlxuLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgTm9kZS5qcyBjb250cmlidXRvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIE1JVCBsaWNlbnNlLlxuXG5pbXBvcnQgeyBXcml0YWJsZSB9IGZyb20gXCIuLi8uLi9zdHJlYW0udHNcIjtcbmltcG9ydCB7IHRvUGF0aElmRmlsZVVSTCB9IGZyb20gXCIuLi91cmwudHNcIjtcbmltcG9ydCB7IG9wZW4sIHR5cGUgb3BlbkZsYWdzIH0gZnJvbSBcIi4uLy4uL19mcy9fZnNfb3Blbi50c1wiO1xuaW1wb3J0IHsgd3JpdGUgfSBmcm9tIFwiLi4vLi4vX2ZzL19mc193cml0ZS5tanNcIjtcbmltcG9ydCB7IGNsb3NlIH0gZnJvbSBcIi4uLy4uL19mcy9fZnNfY2xvc2UudHNcIjtcbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gXCIuLi8uLi9idWZmZXIudHNcIjtcblxuY29uc3Qga0ZzID0gU3ltYm9sKFwia0ZzXCIpO1xuY29uc3Qga0lzUGVyZm9ybWluZ0lPID0gU3ltYm9sKFwia0lzUGVyZm9ybWluZ0lPXCIpO1xuY29uc3Qga0lvRG9uZSA9IFN5bWJvbChcImtJb0RvbmVcIik7XG5cbmludGVyZmFjZSBXcml0ZVN0cmVhbU9wdGlvbnMge1xuICBmbGFncz86IG9wZW5GbGFncztcbiAgbW9kZT86IG51bWJlcjtcbiAgZnM/OiBGUztcbiAgZW5jb2Rpbmc/OiBzdHJpbmc7XG4gIGhpZ2hXYXRlck1hcms/OiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBGUyB7XG4gIG9wZW46IHR5cGVvZiBvcGVuO1xuICB3cml0ZTogdHlwZW9mIHdyaXRlO1xuICBjbG9zZTogdHlwZW9mIGNsb3NlO1xufVxuXG5leHBvcnQgY2xhc3MgV3JpdGVTdHJlYW1DbGFzcyBleHRlbmRzIFdyaXRhYmxlIHtcbiAgZmQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBwYXRoOiBzdHJpbmcgfCBCdWZmZXI7XG4gIGZsYWdzPzogb3BlbkZsYWdzO1xuICBtb2RlPzogbnVtYmVyO1xuICBieXRlc1dyaXR0ZW4gPSAwO1xuICBwb3MgPSAwO1xuICBba0ZzXSA9IHsgb3Blbiwgd3JpdGUgfTtcbiAgW2tJc1BlcmZvcm1pbmdJT10gPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocGF0aDogc3RyaW5nIHwgQnVmZmVyLCBvcHRzOiBXcml0ZVN0cmVhbU9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdHMpO1xuICAgIHRoaXMucGF0aCA9IHRvUGF0aElmRmlsZVVSTChwYXRoKTtcbiAgICB0aGlzLmZsYWdzID0gb3B0cy5mbGFncyB8fCBcIndcIjtcbiAgICB0aGlzLm1vZGUgPSBvcHRzLm1vZGUgfHwgMG82NjY7XG4gICAgdGhpc1trRnNdID0gb3B0cy5mcyA/PyB7IG9wZW4sIHdyaXRlLCBjbG9zZSB9O1xuXG4gICAgaWYgKG9wdHMuZW5jb2RpbmcpIHtcbiAgICAgIHRoaXMuc2V0RGVmYXVsdEVuY29kaW5nKG9wdHMuZW5jb2RpbmcpO1xuICAgIH1cbiAgfVxuXG4gIG92ZXJyaWRlIF9jb25zdHJ1Y3QoY2FsbGJhY2s6IChlcnI/OiBFcnJvcikgPT4gdm9pZCkge1xuICAgIHRoaXNba0ZzXS5vcGVuKFxuICAgICAgdGhpcy5wYXRoLnRvU3RyaW5nKCksXG4gICAgICB0aGlzLmZsYWdzISxcbiAgICAgIHRoaXMubW9kZSEsXG4gICAgICAoZXJyOiBFcnJvciB8IG51bGwsIGZkOiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mZCA9IGZkO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB0aGlzLmVtaXQoXCJvcGVuXCIsIHRoaXMuZmQpO1xuICAgICAgICB0aGlzLmVtaXQoXCJyZWFkeVwiKTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIG92ZXJyaWRlIF93cml0ZShcbiAgICBkYXRhOiBCdWZmZXIsXG4gICAgX2VuY29kaW5nOiBzdHJpbmcsXG4gICAgY2I6IChlcnI/OiBFcnJvciB8IG51bGwpID0+IHZvaWQsXG4gICkge1xuICAgIHRoaXNba0lzUGVyZm9ybWluZ0lPXSA9IHRydWU7XG4gICAgdGhpc1trRnNdLndyaXRlKFxuICAgICAgdGhpcy5mZCEsXG4gICAgICBkYXRhLFxuICAgICAgMCxcbiAgICAgIGRhdGEubGVuZ3RoLFxuICAgICAgdGhpcy5wb3MsXG4gICAgICAoZXI6IEVycm9yIHwgbnVsbCwgYnl0ZXM6IG51bWJlcikgPT4ge1xuICAgICAgICB0aGlzW2tJc1BlcmZvcm1pbmdJT10gPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgICAgICAgLy8gVGVsbCAuX2Rlc3Ryb3koKSB0aGF0IGl0J3Mgc2FmZSB0byBjbG9zZSB0aGUgZmQgbm93LlxuICAgICAgICAgIGNiKGVyKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0KGtJb0RvbmUsIGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlcikge1xuICAgICAgICAgIHJldHVybiBjYihlcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJ5dGVzV3JpdHRlbiArPSBieXRlcztcbiAgICAgICAgY2IoKTtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGlmICh0aGlzLnBvcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnBvcyArPSBkYXRhLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSBfZGVzdHJveShlcnI6IEVycm9yLCBjYjogKGVycj86IEVycm9yIHwgbnVsbCkgPT4gdm9pZCkge1xuICAgIGlmICh0aGlzW2tJc1BlcmZvcm1pbmdJT10pIHtcbiAgICAgIHRoaXMub25jZShrSW9Eb25lLCAoZXIpID0+IGNsb3NlU3RyZWFtKHRoaXMsIGVyciB8fCBlciwgY2IpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xvc2VTdHJlYW0odGhpcywgZXJyLCBjYik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlU3RyZWFtKFxuICAvLyBkZW5vLWxpbnQtaWdub3JlIG5vLWV4cGxpY2l0LWFueVxuICBzdHJlYW06IGFueSxcbiAgZXJyOiBFcnJvcixcbiAgY2I6IChlcnI/OiBFcnJvciB8IG51bGwpID0+IHZvaWQsXG4pIHtcbiAgaWYgKCFzdHJlYW0uZmQpIHtcbiAgICBjYihlcnIpO1xuICB9IGVsc2Uge1xuICAgIHN0cmVhbVtrRnNdLmNsb3NlKHN0cmVhbS5mZCwgKGVyPzogRXJyb3IgfCBudWxsKSA9PiB7XG4gICAgICBjYihlciB8fCBlcnIpO1xuICAgIH0pO1xuICAgIHN0cmVhbS5mZCA9IG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFdyaXRlU3RyZWFtKFxuICBwYXRoOiBzdHJpbmcgfCBCdWZmZXIsXG4gIG9wdHM6IFdyaXRlU3RyZWFtT3B0aW9ucyxcbik6IFdyaXRlU3RyZWFtQ2xhc3Mge1xuICByZXR1cm4gbmV3IFdyaXRlU3RyZWFtQ2xhc3MocGF0aCwgb3B0cyk7XG59XG5cbldyaXRlU3RyZWFtLnByb3RvdHlwZSA9IFdyaXRlU3RyZWFtQ2xhc3MucHJvdG90eXBlO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV3JpdGVTdHJlYW0oXG4gIHBhdGg6IHN0cmluZyB8IEJ1ZmZlcixcbiAgb3B0czogV3JpdGVTdHJlYW1PcHRpb25zLFxuKTogV3JpdGVTdHJlYW1DbGFzcyB7XG4gIHJldHVybiBuZXcgV3JpdGVTdHJlYW1DbGFzcyhwYXRoLCBvcHRzKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwRUFBMEU7QUFDMUUscUZBQXFG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