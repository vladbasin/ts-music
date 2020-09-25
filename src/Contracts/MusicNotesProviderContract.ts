import { MusicNote } from "../Models/MusicNote";

export interface MusicNotesProviderContract {
    provideAllNotes(): MusicNote[];
    provideNotes(language: string): MusicNote[];
    provideNote(step: number, language: string): MusicNote;
}