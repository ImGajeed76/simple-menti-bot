"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.InterflowProgressBar = exports.Interflow = exports.InterflowColor = void 0;
var readline = require("readline");
var node_process_1 = require("node:process");
var getCursorPosition = require('get-cursor-position');
var keyMap = [
    { bytes: [27, 91, 65], name: "up" },
    { bytes: [27, 91, 66], name: "down" },
    { bytes: [27, 91, 67], name: "right" },
    { bytes: [27, 91, 68], name: "left" },
    { bytes: [13], name: "enter" },
    { bytes: [8], name: "backspace" },
    { bytes: [32], name: "space" },
    { bytes: [27], name: "escape" },
    { bytes: [9], name: "tab" },
    { bytes: [27, 91, 49, 126], name: "home" },
    { bytes: [27, 91, 50, 126], name: "insert" },
    { bytes: [27, 91, 51, 126], name: "delete" },
    { bytes: [27, 91, 52, 126], name: "end" },
    { bytes: [27, 91, 53, 126], name: "pageup" },
    { bytes: [27, 91, 54, 126], name: "pagedown" },
    { bytes: [27, 91, 91, 65], name: "f1" },
    { bytes: [27, 91, 91, 66], name: "f2" },
    { bytes: [27, 91, 91, 67], name: "f3" },
    { bytes: [27, 91, 91, 68], name: "f4" },
    { bytes: [27, 91, 91, 69], name: "f5" },
    { bytes: [27, 91, 49, 55, 126], name: "f6" },
    { bytes: [27, 91, 49, 56, 126], name: "f7" },
    { bytes: [27, 91, 49, 57, 126], name: "f8" },
    { bytes: [27, 91, 50, 48, 126], name: "f9" },
    { bytes: [27, 91, 50, 49, 126], name: "f10" },
    { bytes: [27, 91, 50, 51, 126, 27], name: "f11" },
    { bytes: [27, 91, 50, 52, 126], name: "f12" },
];
var Key = /** @class */ (function () {
    function Key(key) {
        this.bytes = [];
        for (var i = 0; i < key.length; i++) {
            this.bytes.push(key.charCodeAt(i));
        }
    }
    Key.prototype.code = function () {
        var _this = this;
        var _a;
        var from_keyMap = (_a = keyMap.find(function (key) { return key.bytes.toString() === _this.bytes.toString(); })) === null || _a === void 0 ? void 0 : _a.name;
        var from_bytes = String.fromCharCode(this.bytes[0]).replace(/[^\x20-\x7E]/g, '');
        return (from_keyMap || from_bytes) || 'unknown';
    };
    Key.prototype.value = function () {
        return String.fromCharCode(this.bytes[0]).replace(/[^\x20-\x7E]/g, '');
    };
    return Key;
}());
var InterflowColor = /** @class */ (function () {
    function InterflowColor() {
    }
    InterflowColor.red = function (text) {
        return "\u001B[31m".concat(text, "\u001B[0m");
    };
    InterflowColor.green = function (text) {
        return "\u001B[32m".concat(text, "\u001B[0m");
    };
    InterflowColor.yellow = function (text) {
        return "\u001B[33m".concat(text, "\u001B[0m");
    };
    InterflowColor.blue = function (text) {
        return "\u001B[34m".concat(text, "\u001B[0m");
    };
    InterflowColor.magenta = function (text) {
        return "\u001B[35m".concat(text, "\u001B[0m");
    };
    InterflowColor.cyan = function (text) {
        return "\u001B[36m".concat(text, "\u001B[0m");
    };
    InterflowColor.white = function (text) {
        return "\u001B[37m".concat(text, "\u001B[0m");
    };
    InterflowColor.gray = function (text) {
        return "\u001B[90m".concat(text, "\u001B[0m");
    };
    InterflowColor.black = function (text) {
        return "\u001B[30m".concat(text, "\u001B[0m");
    };
    InterflowColor.redBright = function (text) {
        return "\u001B[91m".concat(text, "\u001B[0m");
    };
    InterflowColor.greenBright = function (text) {
        return "\u001B[92m".concat(text, "\u001B[0m");
    };
    InterflowColor.yellowBright = function (text) {
        return "\u001B[93m".concat(text, "\u001B[0m");
    };
    InterflowColor.blueBright = function (text) {
        return "\u001B[94m".concat(text, "\u001B[0m");
    };
    InterflowColor.magentaBright = function (text) {
        return "\u001B[95m".concat(text, "\u001B[0m");
    };
    InterflowColor.cyanBright = function (text) {
        return "\u001B[96m".concat(text, "\u001B[0m");
    };
    InterflowColor.whiteBright = function (text) {
        return "\u001B[97m".concat(text, "\u001B[0m");
    };
    InterflowColor.bgRed = function (text) {
        return "\u001B[41m".concat(text, "\u001B[0m");
    };
    InterflowColor.bgGreen = function (text) {
        return "\u001B[42m".concat(text, "\u001B[0m");
    };
    InterflowColor.bgYellow = function (text) {
        return "\u001B[43m".concat(text, "\u001B[0m");
    };
    InterflowColor.bgBlue = function (text) {
        return "\u001B[44m".concat(text, "\u001B[0m");
    };
    InterflowColor.bgMagenta = function (text) {
        return "\u001B[45m".concat(text, "\u001B[0m");
    };
    InterflowColor.bgCyan = function (text) {
        return "\u001B[46m".concat(text, "\u001B[0m");
    };
    InterflowColor.bgWhite = function (text) {
        return "\u001B[47m".concat(text, "\u001B[0m");
    };
    InterflowColor.bgBlack = function (text) {
        return "\u001B[40m".concat(text, "\u001B[0m");
    };
    InterflowColor.bgRedBright = function (text) {
        return "\u001B[101m".concat(text, "\u001B[0m");
    };
    InterflowColor.bgGreenBright = function (text) {
        return "\u001B[102m".concat(text, "\u001B[0m");
    };
    InterflowColor.bgYellowBright = function (text) {
        return "\u001B[103m".concat(text, "\u001B[0m");
    };
    InterflowColor.bgBlueBright = function (text) {
        return "\u001B[104m".concat(text, "\u001B[0m");
    };
    InterflowColor.bgMagentaBright = function (text) {
        return "\u001B[105m".concat(text, "\u001B[0m");
    };
    InterflowColor.bgCyanBright = function (text) {
        return "\u001B[106m".concat(text, "\u001B[0m");
    };
    InterflowColor.bgWhiteBright = function (text) {
        return "\u001B[107m".concat(text, "\u001B[0m");
    };
    InterflowColor.bold = function (text) {
        return "\u001B[1m".concat(text, "\u001B[0m");
    };
    InterflowColor.dim = function (text) {
        return "\u001B[2m".concat(text, "\u001B[0m");
    };
    InterflowColor.italic = function (text) {
        return "\u001B[3m".concat(text, "\u001B[0m");
    };
    InterflowColor.underline = function (text) {
        return "\u001B[4m".concat(text, "\u001B[0m");
    };
    InterflowColor.inverse = function (text) {
        return "\u001B[7m".concat(text, "\u001B[0m");
    };
    InterflowColor.hidden = function (text) {
        return "\u001B[8m".concat(text, "\u001B[0m");
    };
    InterflowColor.strikeThrough = function (text) {
        return "\u001B[9m".concat(text, "\u001B[0m");
    };
    InterflowColor.reset = '\x1b[0m';
    return InterflowColor;
}());
exports.InterflowColor = InterflowColor;
var Interflow = /** @class */ (function () {
    function Interflow(stdin, stdout, config) {
        if (config === void 0) { config = {}; }
        this.cursorPosition = (function () {
            var pos = getCursorPosition.sync();
            return { x: pos.col - 1, y: pos.row - 1 };
        });
        this.stdin = stdin;
        this.stdout = stdout;
        this.config = config;
        this.lineZero = this.cursorPosition().y;
    }
    Interflow.prototype.pause = function () {
        this.stdin.setRawMode(false);
        this.stdin.pause();
    };
    Interflow.prototype.resume = function () {
        this.stdin.setRawMode(true);
        this.stdin.resume();
    };
    Interflow.prototype.writeLine = function (before, color, after) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        this.write.apply(this, __spreadArray([before, color, after + "\n"], args, false));
    };
    Interflow.prototype.write = function (before, color, after) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        if (this.config.timestamps) {
            if (before)
                before = " ".concat(before);
            args.unshift("".concat(color, "[").concat(new Date().toLocaleTimeString()).concat(before, "]"));
        }
        else if (before) {
            args.unshift("".concat(color, "[").concat(before, "]"));
        }
        args.push(InterflowColor.reset);
        if (this.config.debugConfig) {
            if (this.config.debugConfig.showLineNumbers) {
                if (this.config.debugConfig.showLineNumbersFromAbsolute) {
                    args.unshift(InterflowColor.gray("".concat(this.cursorPosition().y, " >")));
                }
                else {
                    args.unshift(InterflowColor.gray("".concat(this.cursorPosition().y - this.lineZero, " >")));
                }
            }
        }
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var arg = args_1[_a];
            node_process_1.stdout.write(arg + " ");
        }
        node_process_1.stdout.write(after);
    };
    Interflow.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.writeLine.apply(this, __spreadArray(['', '', ''], args, false));
    };
    Interflow.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.writeLine.apply(this, __spreadArray(['INFO', '\x1b[36m', ''], args, false));
    };
    Interflow.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.writeLine.apply(this, __spreadArray(['WARN', '\x1b[33m', ''], args, false));
    };
    Interflow.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.writeLine.apply(this, __spreadArray(['ERROR', '\x1b[31m', ''], args, false));
    };
    Interflow.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.writeLine.apply(this, __spreadArray(['DEBUG', '\x1b[90m', ''], args, false));
    };
    Interflow.prototype.success = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.writeLine.apply(this, __spreadArray(['SUCCESS', '\x1b[32m', ''], args, false));
    };
    Interflow.prototype.on_key = function (callback) {
        this.stdin.on('data', function (key) {
            var keyObj = new Key(key.toString());
            callback(keyObj);
        });
    };
    Interflow.prototype.on = function (name, callback) {
        this.resume();
        switch (name) {
            case 'key':
                this.on_key(callback);
                break;
            default:
                throw new Error("Unknown event name: ".concat(name));
        }
    };
    Interflow.prototype.addKeyCode = function (name, bytes) {
        keyMap.push({ bytes: bytes, name: name });
    };
    Interflow.prototype.goto = function (x, y, absolute) {
        if (y === void 0) { y = null; }
        if (absolute === void 0) { absolute = false; }
        if (!absolute && y) {
            y += this.lineZero;
        }
        node_process_1.stdout.cursorTo(x, y);
    };
    Interflow.prototype.clearLine = function (line, absolute) {
        if (absolute === void 0) { absolute = false; }
        if (!absolute) {
            line += this.lineZero;
        }
        node_process_1.stdout.cursorTo(0, line);
        node_process_1.stdout.clearLine(1);
    };
    Interflow.prototype.up = function (n) {
        if (n === void 0) { n = 1; }
        node_process_1.stdout.moveCursor(0, -n);
    };
    Interflow.prototype.down = function (n) {
        if (n === void 0) { n = 1; }
        node_process_1.stdout.moveCursor(0, n);
    };
    Interflow.prototype.input = function (prompt, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            var query = "";
                            if (_this.config.timestamps) {
                                query += "[".concat(new Date().toLocaleTimeString(), "] ");
                            }
                            query += "".concat(prompt);
                            var rl = readline.createInterface(_this.stdin, _this.stdout);
                            rl.question(query, function (input) {
                                rl.close();
                                callback(input);
                                resolve("");
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Interflow.prototype.boolInput = function (prompt, callback, defaultVal) {
        if (defaultVal === void 0) { defaultVal = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            var running = true;
                            var input = defaultVal;
                            var trueStr = "(".concat(InterflowColor.greenBright("Y"), "/").concat(InterflowColor.gray("n"), ")");
                            var falseStr = "(".concat(InterflowColor.gray("y"), "/").concat(InterflowColor.redBright("N"), ")");
                            _this.log(prompt, "".concat(input ? trueStr : falseStr));
                            _this.resume();
                            _this.on("key", function (key) {
                                if (!running)
                                    return;
                                if (key.code() === "enter") {
                                    running = false;
                                    callback(input);
                                    _this.pause();
                                    resolve("");
                                    return;
                                }
                                else if (key.code() === "left" || key.code() === "right") {
                                    input = !input;
                                }
                                else if (key.code() === "y") {
                                    input = true;
                                }
                                else if (key.code() === "n") {
                                    input = false;
                                }
                                _this.up();
                                _this.log(prompt, "".concat(input ? trueStr : falseStr));
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Interflow.prototype.chooseInput = function (prompt, options, callback, defaultVal) {
        if (defaultVal === void 0) { defaultVal = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            var running = true;
                            if (!defaultVal)
                                defaultVal = options[0];
                            var input = defaultVal;
                            var optionStr = options.map(function (option, i) {
                                if (option === input) {
                                    return InterflowColor.greenBright("[".concat(option, "]"));
                                }
                                else {
                                    return InterflowColor.gray("[".concat(option, "]"));
                                }
                            }).join(" ");
                            _this.log(prompt, optionStr);
                            _this.resume();
                            _this.on("key", function (key) {
                                if (!running)
                                    return;
                                if (key.code() === "enter") {
                                    running = false;
                                    callback(input);
                                    _this.pause();
                                    resolve("");
                                    return;
                                }
                                else if (key.code() === "left") {
                                    var index = options.indexOf(input);
                                    if (index === -1) {
                                        input = options[options.length - 1];
                                    }
                                    else {
                                        index--;
                                        if (index < 0)
                                            index = options.length - 1;
                                        input = options[index];
                                    }
                                }
                                else if (key.code() === "right") {
                                    var index = options.indexOf(input);
                                    if (index === -1) {
                                        input = options[0];
                                    }
                                    else {
                                        index++;
                                        if (index >= options.length)
                                            index = 0;
                                        input = options[index];
                                    }
                                }
                                _this.up();
                                optionStr = options.map(function (option, i) {
                                    if (option === input) {
                                        return InterflowColor.greenBright("[".concat(option, "]"));
                                    }
                                    else {
                                        return InterflowColor.gray("[".concat(option, "]"));
                                    }
                                }).join(" ");
                                _this.log(prompt, optionStr);
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Interflow.prototype.clear = function () {
        node_process_1.stdout.write('\x1b[2J');
        this.goto(0, 0, true);
    };
    Interflow.sleep = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
            });
        });
    };
    return Interflow;
}());
exports.Interflow = Interflow;
var InterflowProgressBar = /** @class */ (function () {
    function InterflowProgressBar(interflow) {
        this.max = 100;
        this.current = 0;
        this.barLength = 20;
        this.barChar = "█";
        this.emptyChar = " ";
        this.startChar = "[";
        this.endChar = "]";
        this.label = "";
        this.useBlocks = false;
        this.interflow = interflow;
    }
    InterflowProgressBar.prototype.setMax = function (max) {
        this.max = max;
        return this;
    };
    InterflowProgressBar.prototype.setBarLength = function (length) {
        this.barLength = length;
        return this;
    };
    InterflowProgressBar.prototype.setBarChar = function (char) {
        this.barChar = char;
        return this;
    };
    InterflowProgressBar.prototype.setEmptyChar = function (char) {
        this.emptyChar = char;
        return this;
    };
    InterflowProgressBar.prototype.setLabel = function (label) {
        this.label = label;
        return this;
    };
    InterflowProgressBar.prototype.setProgress = function (current) {
        this.current = current;
        return this;
    };
    InterflowProgressBar.prototype.setStartChar = function (char) {
        this.startChar = char;
        return this;
    };
    InterflowProgressBar.prototype.setEndChar = function (char) {
        this.endChar = char;
        return this;
    };
    InterflowProgressBar.prototype.setUseBlocks = function (useBlocks) {
        this.useBlocks = useBlocks;
        return this;
    };
    InterflowProgressBar.prototype.renderWithBlocks = function () {
        var currentPos = this.interflow.cursorPosition();
        if (!this.barPosition)
            this.barPosition = { x: currentPos.x, y: currentPos.y };
        this.interflow.goto(0, this.barPosition.y, true);
        if (this.barPosition.y === currentPos.y)
            currentPos.y++;
        var blocks = [" ", "▏", "▎", "▍", "▌", "▋", "▊", "▉", "█"];
        var percent = Math.floor((this.current / this.max) * 100);
        var blockPercent = Math.floor((this.current / this.max) * blocks.length * this.barLength);
        var bar = "";
        for (var i = 0; i < this.barLength; i++) {
            if (i * blocks.length >= blockPercent) {
                bar += this.emptyChar;
            }
            else if ((i + 1) * blocks.length <= blockPercent) {
                bar += blocks[blocks.length - 1];
            }
            else {
                bar += blocks[blockPercent % blocks.length];
            }
        }
        var label = this.label;
        if (label)
            label += " ";
        this.interflow.log("".concat(label).concat(this.startChar).concat(bar).concat(this.endChar, " (").concat(percent, "%)"));
        this.interflow.goto(currentPos.x, currentPos.y, true);
    };
    InterflowProgressBar.prototype.render = function () {
        if (this.useBlocks)
            return this.renderWithBlocks();
        var currentPos = this.interflow.cursorPosition();
        if (!this.barPosition)
            this.barPosition = { x: currentPos.x, y: currentPos.y };
        this.interflow.goto(0, this.barPosition.y, true);
        if (this.barPosition.y === currentPos.y)
            currentPos.y++;
        var percent = Math.floor((this.current / this.max) * 100);
        var bar = "";
        for (var i = 0; i < this.barLength; i++) {
            if (i < Math.floor((percent / 100) * this.barLength)) {
                bar += this.barChar;
            }
            else {
                bar += this.emptyChar;
            }
        }
        var label = this.label;
        if (label)
            label += " ";
        this.interflow.log("".concat(label).concat(this.startChar).concat(bar).concat(this.endChar, " (").concat(percent, "%)"));
        this.interflow.goto(currentPos.x, currentPos.y, true);
    };
    InterflowProgressBar.prototype.tick = function (stepSize) {
        if (stepSize === void 0) { stepSize = 1; }
        this.current += stepSize;
        this.render();
    };
    return InterflowProgressBar;
}());
exports.InterflowProgressBar = InterflowProgressBar;
