import { writable } from "svelte/store";
import type { PlaylistSummary } from "$lib/types/playlist";

interface PlaylistList{
    items: PlaylistSummary[]
}

const defaultValues: PlaylistList = {
    items: []
}

const playlistStore = writable<PlaylistList>(defaultValues)

export default playlistStore


