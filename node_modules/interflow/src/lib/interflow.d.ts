type InterflowConfig = {
    timestamps?: boolean;
    debugConfig?: InterflowDebugConfig;
};
type InterflowDebugConfig = {
    showLineNumbers?: boolean;
    showLineNumbersFromAbsolute?: boolean;
};
declare class Key {
    bytes: number[];
    constructor(key: string);
    code(): string;
    value(): string;
}
export declare class InterflowColor {
    static red(text: string): string;
    static green(text: string): string;
    static yellow(text: string): string;
    static blue(text: string): string;
    static magenta(text: string): string;
    static cyan(text: string): string;
    static white(text: string): string;
    static gray(text: string): string;
    static black(text: string): string;
    static redBright(text: string): string;
    static greenBright(text: string): string;
    static yellowBright(text: string): string;
    static blueBright(text: string): string;
    static magentaBright(text: string): string;
    static cyanBright(text: string): string;
    static whiteBright(text: string): string;
    static bgRed(text: string): string;
    static bgGreen(text: string): string;
    static bgYellow(text: string): string;
    static bgBlue(text: string): string;
    static bgMagenta(text: string): string;
    static bgCyan(text: string): string;
    static bgWhite(text: string): string;
    static bgBlack(text: string): string;
    static bgRedBright(text: string): string;
    static bgGreenBright(text: string): string;
    static bgYellowBright(text: string): string;
    static bgBlueBright(text: string): string;
    static bgMagentaBright(text: string): string;
    static bgCyanBright(text: string): string;
    static bgWhiteBright(text: string): string;
    static bold(text: string): string;
    static dim(text: string): string;
    static italic(text: string): string;
    static underline(text: string): string;
    static inverse(text: string): string;
    static hidden(text: string): string;
    static strikethrough(text: string): string;
    static reset: string;
}
export declare class Interflow {
    stdin: any;
    stdout: any;
    config: InterflowConfig;
    lineZero: number;
    cursorPosition: () => {
        x: number;
        y: number;
    };
    constructor(stdin: any, stdout: any, config?: InterflowConfig);
    pause(): void;
    resume(): void;
    private writeLine;
    private write;
    log(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    debug(...args: any[]): void;
    success(...args: any[]): void;
    private on_key;
    on(name: string, callback: (key: Key) => void): void;
    addKeyCode(name: string, bytes: number[]): void;
    goto(x: number, y?: number, absolute?: boolean): void;
    clearLine(line: number, absolute?: boolean): void;
    up(n?: number): void;
    down(n?: number): void;
    input(prompt: string, callback: (input: string) => void): Promise<void>;
    boolInput(prompt: string, callback: (input: boolean) => void, defaultVal?: boolean): Promise<void>;
    chooseInput(prompt: string, options: string[], callback: (input: string) => void, defaultVal?: string): Promise<void>;
    clear(): void;
}
export declare class InterflowProgressBar {
    private interflow;
    private max;
    private current;
    private barLength;
    private barChar;
    private emptyChar;
    private startChar;
    private endChar;
    private label;
    private useBlocks;
    private barPosition;
    constructor(interflow: Interflow);
    setMax(max: number): this;
    setBarLength(length: number): this;
    setBarChar(char: string): this;
    setEmptyChar(char: string): this;
    setLabel(label: string): this;
    setProgress(current: number): this;
    setStartChar(char: string): this;
    setEndChar(char: string): this;
    setUseBlocks(useBlocks: boolean): this;
    private renderWithBlocks;
    render(): void;
    tick(stepSize?: number): void;
}
export {};
