import { } from '@vladbasin/ts-services';
import { isNil } from 'lodash';
import { MusicKeysProviderContract } from '../Contracts/MusicKeysProviderContract';
import { MusicNotesProviderContract } from '../Contracts/MusicNotesProviderContract';
import { MusicChord } from '../Models/MusicChord';

export class MusicKeysProvider implements MusicKeysProviderContract {
    private readonly _musicNotesProvider: MusicNotesProviderContract;

    constructor(dep: {
        musicNotesProvider: MusicNotesProviderContract
    }) {
        this._musicNotesProvider = dep.musicNotesProvider;
    }

    public provideParallelMinorKey(key: MusicChord, language: string) {
        const allNotes = this._musicNotesProvider.provideNotes(language);

        const maybeIndex = allNotes.findIndex(note => key.is(note));

        const maybeNote = isNil(maybeIndex)
            ? undefined
            : allNotes[(maybeIndex + 9) % allNotes.length];

        return isNil(maybeNote)
            ? undefined
            : MusicChord.fromNote(maybeNote, true);
    }
}