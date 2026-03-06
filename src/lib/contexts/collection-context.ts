import { createContext } from "svelte";

interface CollectionContextType{
    collectionId: string
    collectionType: 'artist' | 'playlist' | 'other'
}

export const [getCollectionContext, setCollectionContext] = createContext<CollectionContextType>()