import { } from '@vladbasin/ts-services';
import { MusicNote } from "./MusicNote";

const MinorSuffix = "m";

export class MusicChord {
    private readonly _chord: string;

    constructor(stringChord: string) {
        this._chord = stringChord;
    }

    public get string(): string { return this._chord; }
    public get isMinor(): boolean { return this._chord.endsWith(MinorSuffix); }

    public is(key: MusicNote): boolean {
        const possibleOptions = [this.string, this.string.toUpperCase()];

        return MusicChord.fromNoteAll(key, true).some(chord => possibleOptions.some(t => t === chord.string));
    }

    public static fromNote(note: MusicNote, isMinor: boolean): MusicChord {
        const stringChord = isMinor
            ? this.getMinor(note.primary)
            : note.primary;

        return new MusicChord(stringChord);
    }

    public static fromNoteAll(key: MusicNote, includeMinor: boolean): MusicChord[] {
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