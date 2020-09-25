import { } from '@vladbasin/ts-services';
import { isNil } from 'lodash';
import { MusicNotesProviderContract } from "../Contracts/MusicNotesProviderContract";
import { Language } from '../Models/Language';
import { MusicNote } from "../Models/MusicNote";

export class MusicNotesProvider implements MusicNotesProviderContract {
    private readonly _allKeys: Map<string, MusicNote[]>;
 
    private readonly _keysStrings = {
        [Language.en]: "G#|Ab,A,A#|Bb,B,C,C#|Db,D,D#|Eb,E,F,F#|Gb,G",
        [Language.ru]: "G#|Ab,A,A#|B,H,C,C#|Db,D,D#|Eb,E,F,F#|Gb,G",
    };

    constructor() {
        this._allKeys = this.createAllKeysMap();
    }

    public provideNotes(language: string): MusicNote[] {
        return this._allKeys.get(language) || [];
    }

    public provideAllNotes(): MusicNote[] {
        return Array.from(this._allKeys.values()).mapMany(t => t);
    }

    private createAllKeysMap(): Map<Language, MusicNote[]> {
        const entries = Array.from(Object.entries(this._keysStrings));

        const result = new Map<Language, MusicNote[]>();

        entries.forEach(localizedKeys => {
            const keys = localizedKeys[1].split(',').map(optionString => new MusicNote(optionString));

            result.set(localizedKeys[0] as Language, keys);
        });

        return result;
    }
}