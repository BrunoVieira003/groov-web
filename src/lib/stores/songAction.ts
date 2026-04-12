import type Song from "$lib/types/song";
import { writable } from "svelte/store";

export const targetedSong = writable<Song>()
export const targetedTrackNumber = writable<number>()