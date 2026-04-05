import { createContext } from "svelte";

export type CollectionType = 'artist' | 'playlist' | 'album' | 'library' | 'other'

interface CollectionContextType{
    collectionId: string
    collectionType: CollectionType
}


export const [getCollectionContext, setCollectionContext] = createContext<CollectionContextType>()