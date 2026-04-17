import type Song from "$lib/types/song"
import { writable } from "svelte/store"

export const currentSong = writable<Song | undefined>()

export const currentTime = writable(0)
export const duration = writable(0)
export const volume = writable(1)