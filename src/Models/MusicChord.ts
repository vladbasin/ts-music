import { } from '@vladbasin/ts-services';
import { MusicKey } from "./MusicKey";

const MinorSuffix = "m";

export class MusicChord {
    private readonly _chord: string;

    constructor(stringChord: string) {
        this._chord = stringChord;
    }

    public get string(): string { return this._chord; }
    public get isMinor(): boolean { return this._chord.endsWith(MinorSuffix); }

    public is(key: MusicKey): boolean {
        const possibleOptions = [this.string, this.string.toUpperCase()];

        return MusicChord.fromKeyAll(key, true).some(chord => possibleOptions.some(t => t === chord.string));
    }

    public static fromKey(key: MusicKey, isMinor: boolean): MusicChord {
        const stringChord = isMinor
            ? this.getMinor(key.primary)
            : key.primary;

        return new MusicChord(stringChord);
    }

    public static fromKeyAll(key: MusicKey, includeMinor: boolean): MusicChord[] {
        return key.options.mapMany(keyOption => {
            const stringChords = [keyOption];

            if (includeMinor) {
                stringChords.push(MusicChord.getMinor(keyOption))
            }

            return stringChords.map(stringChord => new MusicChord(stringChord));
        });
    }

    private static getMinor(keyString: string): string {
        return `${keyString}${MinorSuffix}`;
    }
}