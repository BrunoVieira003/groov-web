import type Song from "$lib/types/song";
import { writable } from "svelte/store";

const currentSong = writable<Song | undefined>()

export {currentSong}