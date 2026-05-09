import { writable } from "svelte/store";

export type AlbumLayout = 'default' | 'cassete'
export const albumLayout = writable<AlbumLayout>('default')

export type AudioVisualizerOptions = 'disabled' | 'bottom' | 'middle' | 'top'
export const audioVisualizer = writable<AudioVisualizerOptions>('disabled')