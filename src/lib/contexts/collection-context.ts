import { createContext } from "svelte";

interface CollectionContextType{
    collectionId: string
    collectionType: 'artist' | 'playlist'
}

export const [getCollectionContext, setCollectionContext] = createContext<CollectionContextType>()