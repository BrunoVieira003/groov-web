import type Song from "$lib/types/song";
import { createContext } from "svelte";

export type CollectionType = 'artist' | 'playlist' | 'album' | 'library' | 'search' | 'other'

interface CollectionContextType{
    collectionId: string | undefined
    collectionType: CollectionType
    collectionName: string | undefined
    tracks: Song[]
}


export const [getCollectionContext, setCollectionContext] = createContext<CollectionContextType>()