import * as readline from "readline";
import {stdout} from "node:process";

const getCursorPosition = require('get-cursor-position');

type InterflowConfig = {
    timestamps?: boolean;
    debugConfig?: InterflowDebugConfig;
}

type InterflowDebugConfig = {
    showLineNumbers?: boolean;
    showLineNumbersFromAbsolute?: boolean;
}

const keyMap = [
    {bytes: [27, 91, 65], name: "up"},
    {bytes: [27, 91, 66], name: "down"},
    {bytes: [27, 91, 67], name: "right"},
    {bytes: [27, 91, 68], name: "left"},
    {bytes: [13], name: "enter"},
    {bytes: [8], name: "backspace"},
    {bytes: [32], name: "space"},
    {bytes: [27], name: "escape"},
    {bytes: [9], name: "tab"},
    {bytes: [27, 91, 49, 126], name: "home"},
    {bytes: [27, 91, 50, 126], name: "insert"},
    {bytes: [27, 91, 51, 126], name: "delete"},
    {bytes: [27, 91, 52, 126], name: "end"},
    {bytes: [27, 91, 53, 126], name: "pageup"},
    {bytes: [27, 91, 54, 126], name: "pagedown"},
    {bytes: [27, 91, 91, 65], name: "f1"},
    {bytes: [27, 91, 91, 66], name: "f2"},
    {bytes: [27, 91, 91, 67], name: "f3"},
    {bytes: [27, 91, 91, 68], name: "f4"},
    {bytes: [27, 91, 91, 69], name: "f5"},
    {bytes: [27, 91, 49, 55, 126], name: "f6"},
    {bytes: [27, 91, 49, 56, 126], name: "f7"},
    {bytes: [27, 91, 49, 57, 126], name: "f8"},
    {bytes: [27, 91, 50, 48, 126], name: "f9"},
    {bytes: [27, 91, 50, 49, 126], name: "f10"},
    {bytes: [27, 91, 50, 51, 126, 27], name: "f11"},
    {bytes: [27, 91, 50, 52, 126], name: "f12"},
]

class Key {
    bytes: number[];

    constructor(key: string) {
        this.bytes = [];
        for (let i = 0; i < key.length; i++) {
            this.bytes.push(key.charCodeAt(i));
        }
    }

    code() {
        const from_keyMap = keyMap.find(key => key.bytes.toString() === this.bytes.toString())?.name;
        const from_bytes = String.fromCharCode(this.bytes[0]).replace(/[^\x20-\x7E]/g, '');
        return (from_keyMap || from_bytes) || 'unknown';
    }

    value() {
        return String.fromCharCode(this.bytes[0]).replace(/[^\x20-\x7E]/g, '');
    }
}

export class InterflowColor {
    static red(text: string) {
        return `\x1b[31m${text}\x1b[0m`;
    }

    static green(text: string) {
        return `\x1b[32m${text}\x1b[0m`;
    }

    static yellow(text: string) {
        return `\x1b[33m${text}\x1b[0m`;
    }

    static blue(text: string) {
        return `\x1b[34m${text}\x1b[0m`;
    }

    static magenta(text: string) {
        return `\x1b[35m${text}\x1b[0m`;
    }

    static cyan(text: string) {
        return `\x1b[36m${text}\x1b[0m`;
    }

    static white(text: string) {
        return `\x1b[37m${text}\x1b[0m`;
    }

    static gray(text: string) {
        return `\x1b[90m${text}\x1b[0m`;
    }

    static black(text: string) {
        return `\x1b[30m${text}\x1b[0m`;
    }

    static redBright(text: string) {
        return `\x1b[91m${text}\x1b[0m`;
    }

    static greenBright(text: string) {
        return `\x1b[92m${text}\x1b[0m`;
    }

    static yellowBright(text: string) {
        return `\x1b[93m${text}\x1b[0m`;
    }

    static blueBright(text: string) {
        return `\x1b[94m${text}\x1b[0m`;
    }

    static magentaBright(text: string) {
        return `\x1b[95m${text}\x1b[0m`;
    }

    static cyanBright(text: string) {
        return `\x1b[96m${text}\x1b[0m`;
    }

    static whiteBright(text: string) {
        return `\x1b[97m${text}\x1b[0m`;
    }

    static bgRed(text: string) {
        return `\x1b[41m${text}\x1b[0m`;
    }

    static bgGreen(text: string) {
        return `\x1b[42m${text}\x1b[0m`;
    }

    static bgYellow(text: string) {
        return `\x1b[43m${text}\x1b[0m`;
    }

    static bgBlue(text: string) {
        return `\x1b[44m${text}\x1b[0m`;
    }

    static bgMagenta(text: string) {
        return `\x1b[45m${text}\x1b[0m`;
    }

    static bgCyan(text: string) {
        return `\x1b[46m${text}\x1b[0m`;
    }

    static bgWhite(text: string) {
        return `\x1b[47m${text}\x1b[0m`;
    }

    static bgBlack(text: string) {
        return `\x1b[40m${text}\x1b[0m`;
    }

    static bgRedBright(text: string) {
        return `\x1b[101m${text}\x1b[0m`;
    }

    static bgGreenBright(text: string) {
        return `\x1b[102m${text}\x1b[0m`;
    }

    static bgYellowBright(text: string) {
        return `\x1b[103m${text}\x1b[0m`;
    }

    static bgBlueBright(text: string) {
        return `\x1b[104m${text}\x1b[0m`;
    }

    static bgMagentaBright(text: string) {
        return `\x1b[105m${text}\x1b[0m`;
    }

    static bgCyanBright(text: string) {
        return `\x1b[106m${text}\x1b[0m`;
    }

    static bgWhiteBright(text: string) {
        return `\x1b[107m${text}\x1b[0m`;
    }

    static bold(text: string) {
        return `\x1b[1m${text}\x1b[0m`;
    }

    static dim(text: string) {
        return `\x1b[2m${text}\x1b[0m`;
    }

    static italic(text: string) {
        return `\x1b[3m${text}\x1b[0m`;
    }

    static underline(text: string) {
        return `\x1b[4m${text}\x1b[0m`;
    }

    static inverse(text: string) {
        return `\x1b[7m${text}\x1b[0m`;
    }

    static hidden(text: string) {
        return `\x1b[8m${text}\x1b[0m`;
    }

    static strikeThrough(text: string) {
        return `\x1b[9m${text}\x1b[0m`;
    }

    static reset = '\x1b[0m';
}

export class Interflow {
    stdin: any;
    stdout: any;
    config: InterflowConfig;
    lineZero: number;

    cursorPosition = (() => {
        const pos = getCursorPosition.sync();
        return {x: pos.col - 1, y: pos.row - 1};
    });

    constructor(stdin: any, stdout: any, config: InterflowConfig = {}) {
        this.stdin = stdin;
        this.stdout = stdout;
        this.config = config;

        this.lineZero = this.cursorPosition().y;
    }

    pause() {
        this.stdin.setRawMode(false);
        this.stdin.pause();
    }

    resume() {
        this.stdin.setRawMode(true);
        this.stdin.resume();
    }

    private writeLine(before: string, color: string, after: string, ...args: any[]) {
        this.write(before, color, after + "\n", ...args);
    }

    private write(before: string, color: string, after: string, ...args: any[]) {
        if (this.config.timestamps) {
            if (before) before = ` ${before}`;
            args.unshift(`${color}[${new Date().toLocaleTimeString()}${before}]`);
        } else if (before) {
            args.unshift(`${color}[${before}]`);
        }
        args.push(InterflowColor.reset);

        if (this.config.debugConfig) {
            if (this.config.debugConfig.showLineNumbers) {
                if (this.config.debugConfig.showLineNumbersFromAbsolute) {
                    args.unshift(InterflowColor.gray(`${this.cursorPosition().y} >`));
                }
                else {
                    args.unshift(InterflowColor.gray(`${this.cursorPosition().y - this.lineZero} >`));
                }
            }
        }

        for (const arg of args) {
            stdout.write(arg + " ");
        }
        stdout.write(after);
    }

    log(...args: any[]) {
        this.writeLine('', '', '', ...args);
    }

    info(...args: any[]) {
        this.writeLine('INFO', '\x1b[36m', '', ...args);
    }

    warn(...args: any[]) {
        this.writeLine('WARN', '\x1b[33m', '', ...args);
    }

    error(...args: any[]) {
        this.writeLine('ERROR', '\x1b[31m', '', ...args);
    }

    debug(...args: any[]) {
        this.writeLine('DEBUG', '\x1b[90m', '', ...args);
    }

    success(...args: any[]) {
        this.writeLine('SUCCESS', '\x1b[32m', '', ...args);
    }

    private on_key(callback: (key: Key) => void) {
        this.stdin.on('data', (key) => {
            const keyObj = new Key(key.toString());
            callback(keyObj)
        });
    }

    on(name: string, callback: (key: Key) => void) {
        this.resume();
        switch (name) {
            case 'key':
                this.on_key(callback);
                break;
            default:
                throw new Error(`Unknown event name: ${name}`);
        }
    }

    addKeyCode(name: string, bytes: number[]) {
        keyMap.push({bytes, name});
    }

    goto(x: number, y: number = null, absolute: boolean = false) {
        if (!absolute && y) {
            y += this.lineZero
        }
        stdout.cursorTo(x, y);
    }

    clearLine(line: number, absolute: boolean = false) {
        if (!absolute) {
            line += this.lineZero
        }
        stdout.cursorTo(0, line);
        stdout.clearLine(1);
    }

    up(n: number = 1) {
        stdout.moveCursor(0, -n);
    }

    down(n: number = 1) {
        stdout.moveCursor(0, n);
    }

    async input(prompt: string, callback: (input: string) => void) {
        await new Promise((resolve) => {
            let query = ""
            if (this.config.timestamps) {
                query += `[${new Date().toLocaleTimeString()}] `;
            }
            query += `${prompt}`;

            const rl = readline.createInterface(this.stdin, this.stdout);
            rl.question(query, (input) => {
                rl.close();
                callback(input);
                resolve("");
            });
        })
    }

    async boolInput(prompt: string, callback: (input: boolean) => void, defaultVal: boolean = false) {
        await new Promise((resolve) => {
            let running = true;

            let input = defaultVal;
            let trueStr = `(${InterflowColor.greenBright("Y")}/${InterflowColor.gray("n")})`;
            let falseStr = `(${InterflowColor.gray("y")}/${InterflowColor.redBright("N")})`;

            this.log(prompt, `${input ? trueStr : falseStr}`)

            this.resume();
            this.on("key", (key) => {
                if (!running) return;
                if (key.code() === "enter") {
                    running = false;
                    callback(input);
                    this.pause();

                    resolve("");
                    return;
                } else if (key.code() === "left" || key.code() === "right") {
                    input = !input;
                } else if (key.code() === "y") {
                    input = true;
                } else if (key.code() === "n") {
                    input = false;
                }

                this.up();
                this.log(prompt, `${input ? trueStr : falseStr}`)
            });
        })
    }

    async chooseInput(prompt: string, options: string[], callback: (input: string) => void, defaultVal: string = null) {
        await new Promise((resolve) => {
            let running = true;

            if (!defaultVal) defaultVal = options[0];

            let input = defaultVal;
            let optionStr = options.map((option, i) => {
                if (option === input) {
                    return InterflowColor.greenBright(`[${option}]`);
                } else {
                    return InterflowColor.gray(`[${option}]`);
                }
            }).join(" ");

            this.log(prompt, optionStr);

            this.resume();
            this.on("key", (key) => {
                if (!running) return;
                if (key.code() === "enter") {
                    running = false;
                    callback(input);
                    this.pause();

                    resolve("");
                    return;
                } else if (key.code() === "left") {
                    let index = options.indexOf(input);
                    if (index === -1) {
                        input = options[options.length - 1];
                    } else {
                        index--;
                        if (index < 0) index = options.length - 1;
                        input = options[index];
                    }
                } else if (key.code() === "right") {
                    let index = options.indexOf(input);
                    if (index === -1) {
                        input = options[0];
                    } else {
                        index++;
                        if (index >= options.length) index = 0;
                        input = options[index];
                    }
                }

                this.up();
                optionStr = options.map((option, i) => {
                    if (option === input) {
                        return InterflowColor.greenBright(`[${option}]`);
                    } else {
                        return InterflowColor.gray(`[${option}]`);
                    }
                }).join(" ");
                this.log(prompt, optionStr);
            });
        })
    }

    clear() {
        stdout.write('\x1b[2J');
        this.goto(0, 0, true);
    }

    static async sleep(ms: number) {
        return  new Promise(resolve => setTimeout(resolve, ms))
    }
}

export class InterflowProgressBar {
    private interflow: Interflow;
    private max: number = 100;
    private current: number = 0;
    private barLength: number = 20;
    private barChar: string = "█";
    private emptyChar: string = " ";

    private startChar: string = "[";
    private endChar: string = "]";
    private label: string = "";

    private useBlocks: boolean = false;

    private barPosition: {x: number, y: number};
    constructor(interflow: Interflow) {
        this.interflow = interflow;
    }

    setMax(max: number) {
        this.max = max;
        return this;
    }

    setBarLength(length: number) {
        this.barLength = length;
        return this;
    }

    setBarChar(char: string) {
        this.barChar = char;
        return this;
    }

    setEmptyChar(char: string) {
        this.emptyChar = char;
        return this;
    }

    setLabel(label: string) {
        this.label = label;
        return this;
    }

    setProgress(current: number) {
        this.current = current;
        return this;
    }

    setStartChar(char: string) {
        this.startChar = char;
        return this;
    }

    setEndChar(char: string) {
        this.endChar = char;
        return this;
    }

    setUseBlocks(useBlocks: boolean) {
        this.useBlocks = useBlocks;
        return this;
    }

    private renderWithBlocks() {
        let currentPos = this.interflow.cursorPosition();
        if (!this.barPosition) this.barPosition = {x: currentPos.x, y: currentPos.y};
        this.interflow.goto(0, this.barPosition.y, true);

        if (this.barPosition.y === currentPos.y) currentPos.y++;

        let blocks = [" ", "▏", "▎", "▍", "▌", "▋", "▊", "▉", "█"];

        let percent = Math.floor((this.current / this.max) * 100);
        let blockPercent = Math.floor((this.current / this.max) * blocks.length * this.barLength);

        let bar = "";

        for (let i = 0; i < this.barLength; i++) {
            if (i * blocks.length >= blockPercent) {
                bar += this.emptyChar;
            } else if ((i + 1) * blocks.length <= blockPercent) {
                bar += blocks[blocks.length - 1];
            } else {
                bar += blocks[blockPercent % blocks.length];
            }
        }

        let label = this.label;
        if (label) label += " ";

        this.interflow.log(`${label}${this.startChar}${bar}${this.endChar} (${percent}%)`);
        this.interflow.goto(currentPos.x, currentPos.y, true);
    }

    render() {
        if (this.useBlocks) return this.renderWithBlocks();

        let currentPos = this.interflow.cursorPosition();
        if (!this.barPosition) this.barPosition = {x: currentPos.x, y: currentPos.y};
        this.interflow.goto(0, this.barPosition.y, true);

        if (this.barPosition.y === currentPos.y) currentPos.y++;

        let percent = Math.floor((this.current / this.max) * 100);
        let bar = "";
        for (let i = 0; i < this.barLength; i++) {
            if (i < Math.floor((percent / 100) * this.barLength)) {
                bar += this.barChar;
            } else {
                bar += this.emptyChar;
            }
        }
        let label = this.label;
        if (label) label += " ";

        this.interflow.log(`${label}${this.startChar}${bar}${this.endChar} (${percent}%)`);
        this.interflow.goto(currentPos.x, currentPos.y, true);
    }

    tick(stepSize: number = 1) {
        this.current += stepSize;
        this.render();
    }
}
