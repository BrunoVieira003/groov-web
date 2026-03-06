import { writable } from "svelte/store";
import type { PlaylistSummary } from "$lib/types/playlist";

interface PlaylistList{
    items: PlaylistSummary[]
}

const defaultValues: PlaylistList = {
    items: []
}

const playlistList = writable<PlaylistList>(defaultValues)

export {playlistList}


