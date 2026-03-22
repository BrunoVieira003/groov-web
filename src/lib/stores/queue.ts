import type Song from "$lib/types/song";
import { derived, get, writable, type Updater } from "svelte/store";
import { currentSong } from "./currentSong";

type PlayModeType = 'repeat-off' | 'repeat-all' | 'repeat-one'

interface SongQueue {
    tracks: Song[]
    paused: boolean
    currentIndex: number
    loopMode: PlayModeType
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

function createSongQueueStore() {
    const store = writable<SongQueue>(defaultValues)

    return {
        ...store,
        togglePlay: () => store.update((state) => {
            navigator.mediaSession.playbackState = "paused"
            return {
                ...state,
                paused: !state.paused
            }
        }),
        playQueue: (songs: Song[], playNowIndex?: number) => store.update((state) => {
            if (songs.length === 0) {
                return state
            }

            const index = playNowIndex || 0

            currentSong.set(songs.at(index))
            return {
                ...state,
                currentIndex: index,
                tracks: songs
            }
        }),
        playSong: (song: Song) => store.update((state) => {
            currentSong.set(song)
            return {
                ...state,
                tracks: [song],
                currentIndex: 0
            }
        }),
        nextTrack: () => store.update(nextTrackStrategies[get(store).loopMode]),
        previousTrack: () => store.update(previousTrackStrategies[get(store).loopMode])

    }
}

export const songQueue = createSongQueueStore()


