import { Language } from "../Models/Language";
import { MusicKey } from "../Models/MusicKey";

export interface MusicKeyProviderContract {
    provideAllKeys(): MusicKey[];
    provideKeys(language: Language): MusicKey[];
}