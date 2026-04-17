import { writable } from "svelte/store";

export type AlbumLayout = 'default' | 'cassete'

export const albumLayout = writable<AlbumLayout>('default')