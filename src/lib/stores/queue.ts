import type Song from "$lib/types/song";
import { derived, get, writable, type Updater } from "svelte/store";
import { currentSong } from "./currentSong";
import type { CollectionType } from "$lib/contexts/collection-context";

type PlayModeType = 'repeat-off' | 'repeat-all' | 'repeat-one'

interface SongQueue {
    tracks: Song[]
    paused: boolean
    currentIndex: number
    loopMode: PlayModeType
    collectionType?: CollectionType
    collectionName?: string
    collectionId?: string
}

const defaultValues: SongQueue = {
    tracks: [],
    paused: true,
    currentIndex: 0,
    loopMode: 'repeat-off'
}

const nextTrackStrategies: Record<PlayModeType, Updater<SongQueue>> = {
    'repeat-off': (state) => {
        if (state.currentIndex < state.tracks.length - 1) {
            state.currentIndex += 1
            currentSong.set(state.tracks.at(state.currentIndex))
        }

        return state
    },
    "repeat-all": (state: SongQueue) => {
        state.currentIndex = (state.currentIndex + 1) % state.tracks.length
        currentSong.set(state.tracks.at(state.currentIndex))

        return state
    },
    "repeat-one": (state: SongQueue) => {
        currentSong.set(state.tracks.at(state.currentIndex))
        return state
    }
}

const previousTrackStrategies: Record<PlayModeType, Updater<SongQueue>> = {
    'repeat-off': (state) => {
        if (state.currentIndex > 0) {
            state.currentIndex -= 1
            currentSong.set(state.tracks.at(state.currentIndex))
        }

        return state
    },
    "repeat-all": (state: SongQueue) => {
        state.currentIndex = (state.currentIndex - 1 + state.tracks.length) % state.tracks.length
        currentSong.set(state.tracks.at(state.currentIndex))

        return state
    },
    "repeat-one": (state: SongQueue) => {
        currentSong.set(state.tracks.at(state.currentIndex))
        return state
    }
}

const songQueueStore = writable<SongQueue>(defaultValues)

const togglePlay = () => songQueueStore.update((state) => {
    navigator.mediaSession.playbackState = "paused"
    return {
        ...state,
        paused: !state.paused
    }
})

const playQueue = (songs: Song[], playNowIndex?: number, collectionType: CollectionType = 'other', collectionName: string | undefined = undefined, collectionId: string | undefined = undefined) => songQueueStore.update((state) => {
    if (songs.length === 0) {
        return state
    }

    const index = playNowIndex || 0

    currentSong.set(songs.at(index))
    return {
        ...state,
        currentIndex: index,
        tracks: songs,
        collectionType,
        collectionName,
        collectionId,
    }
})

const playSong = (song: Song) => songQueueStore.update((state) => {
    currentSong.set(song)
    return {
        ...state,
        tracks: [song],
        currentIndex: 0
    }
})

const nextTrack = () => songQueueStore.update(nextTrackStrategies[get(songQueueStore).loopMode])
const previousTrack = () => songQueueStore.update(previousTrackStrategies[get(songQueueStore).loopMode])

const addToQueue = (song: Song) => songQueueStore.update((state) => {
    state.tracks.push(song)
    return state
})

const removeFromQueue = (trackIndex: number) => songQueueStore.update((state) => {
    state.tracks.splice(trackIndex, 1)
    return state
})

const playNext = (song: Song) => songQueueStore.update((state) => {
    console.log('next')
    if(state.currentIndex + 1 < state.tracks.length){
        const postIndexTracks = state.tracks.slice(state.currentIndex + 1)
        postIndexTracks.unshift(song)

        state.tracks.splice(state.currentIndex + 1, postIndexTracks.length-1, ...postIndexTracks)

    }else{
        state.tracks.push(song)
    }

    return state
})

function createSongQueueStore(){
    return {
        ...songQueueStore,
        togglePlay,
        playQueue,
        playSong,
        nextTrack,
        previousTrack,
        addToQueue,
        removeFromQueue,
        playNext
    }
}

export const songQueue = createSongQueueStore()
