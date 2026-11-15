import type Song from "$lib/types/song";
import { writable } from "svelte/store";

export const targetedSong = writable<Song>()
export const targetedTrackIndex = writable<number>()

/** Song being added to a playlist; the global "Add to playlist" modal is open while this is not null */
export const addToPlaylistTarget = writable<Song | null>(null)
