import type { Collection } from "$lib/stores/queue";
import type Song from "$lib/types/song";
import { createContext } from "svelte";

export type CollectionType = 'artist' | 'playlist' | 'album' | 'library' | 'search' | 'other'

interface CollectionContextType{
    collection: Collection
    tracks: Song[]
}


export const [getCollectionContext, setCollectionContext] = createContext<CollectionContextType>()