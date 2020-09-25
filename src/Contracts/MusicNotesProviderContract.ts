import { MusicNote } from "../Models/MusicNote";

export interface MusicNotesProviderContract {
    provideAllNotes(): MusicNote[];
    provideNotes(language: string): MusicNote[];
}