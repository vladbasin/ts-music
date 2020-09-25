export class MusicNote {
    private readonly _primary: string;
    private readonly _secondary: string | undefined;
    private readonly _options: string[];

    constructor(keyOptionsString: string) {
        const options = keyOptionsString.split("|");

        this._primary = options[0];

        if (options.length > 1) {
            this._secondary = options[1];
        }

        this._options = [this._primary, this._secondary].compactMap(t => t);
    }

    get primary() { return this._primary; }
    get secondary() { return this._secondary; }
    get options() { return this._options; }
}