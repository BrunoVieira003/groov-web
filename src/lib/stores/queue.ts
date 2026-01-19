import type Song from "$lib/types/song";
import { derived, writable } from "svelte/store";
import { currentSong } from "./currentSong";

interface SongQueue{
    tracks: Song[],
    paused: boolean,
    currentIndex: number
}

const defaultValues: SongQueue = {
    tracks: [],
    paused: true,
    currentIndex: 0
}
function createSongQueueStore(){
    const store = writable<SongQueue>(defaultValues)

    return {
        ...store,
        togglePlay: () => store.update((state) => {
            return {
                ...state,
                paused: !state.paused
            }
        }),
        playQueue: (songs: Song[], playNowIndex?: number) => store.update((state) => {
            if(songs.length === 0){
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
        nextTrack: () => store.update((state) => {
            if(state.currentIndex < state.tracks.length - 1){
                currentSong.set(state.tracks.at(state.currentIndex + 1))
                return {
                    ...state,
                    currentIndex: state.currentIndex + 1
                }
            }

            return state
        })

    }
}

export const songQueue = createSongQueueStore()


