import { Maybe } from "@vladbasin/ts-types";
import { MusicChord } from '../Models/MusicChord';

export interface MusicKeysProviderContract {
    provideParallelMinorKey(key: MusicChord, language: string): Maybe<MusicChord>;
}