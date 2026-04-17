import type Song from "$lib/types/song"
import { get, writable } from "svelte/store"

export const currentSong = writable<Song | undefined>()

export const currentTime = writable(0)
export const duration = writable(0)
export const volume = writable(1)

export const paused = writable(true)

export function togglePlay(){
    paused.update((state) => {
        if(navigator){
            navigator.mediaSession.playbackState = state ? 'playing' : 'paused'
        }

        return !state
    })
}