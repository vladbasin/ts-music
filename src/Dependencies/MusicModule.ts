import { ModuleContract, ServiceCollectionBuilder } from '@vladbasin/ts-dependencies';
import { MusicKeysProviderContract } from '../Contracts/MusicKeysProviderContract';
import { MusicNotesProviderContract } from '../Contracts/MusicNotesProviderContract';
import { MusicKeysProvider } from '../Services/MusicKeysProvider';
import { MusicNotesProvider } from '../Services/MusicNotesProvider';
import { ServiceIds } from './ServiceIds';

export class MusicModule implements ModuleContract {
    public register(builder: ServiceCollectionBuilder): ServiceCollectionBuilder {
        return builder
            .addPure<MusicNotesProviderContract>(ServiceIds.musicNotesProvider, MusicNotesProvider)
            .add<MusicKeysProviderContract>(ServiceIds.musicKeysProvider, MusicKeysProvider, [
                ServiceIds.musicNotesProvider
            ]);
    }
}