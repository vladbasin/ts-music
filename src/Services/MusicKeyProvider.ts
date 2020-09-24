import { } from '@vladbasin/ts-services';
import { MusicKeyProviderContract } from "../Contracts/MusicKeyProviderContract";
import { Language } from '../Models/Language';
import { MusicKey } from "../Models/MusicKey";

export class MusicKeyProvider implements MusicKeyProviderContract {
    private readonly _allKeys: Map<Language, MusicKey[]>;
 
    private readonly _keysStrings = {
        [Language.en]: "G#|Ab,A,A#|Bb,B,C,C#|Db,D,D#|Eb,E,F,F#|Gb,G",
        [Language.ru]: "G#|Ab,A,A#|B,H,C,C#|Db,D,D#|Eb,E,F,F#|Gb,G",
    };

    constructor() {
        this._allKeys = this.createAllKeysMap();
    }

    public provideKeys(language: Language): MusicKey[] {
        return this._allKeys.get(language) || [];
    }

    public provideAllKeys(): MusicKey[] {
        return Array.from(this._allKeys.values()).mapMany(t => t);
    }

    private createAllKeysMap(): Map<Language, MusicKey[]> {
        const entries = Array.from(Object.entries(this._keysStrings));

        const result = new Map<Language, MusicKey[]>();

        entries.forEach(localizedKeys => {
            const keys = localizedKeys[1].split(',').map(optionString => new MusicKey(optionString));

            result.set(localizedKeys[0] as Language, keys);
        });

        return result;
    }
}