import type Song from "$lib/types/song"
import {  get, writable } from "svelte/store"

export const audioElement = writable<HTMLAudioElement>()

let audioContext: AudioContext
let analyser: AnalyserNode
let audioSource: MediaElementAudioSourceNode

export function getAudioAnalyzer(){
    if(!get(audioElement)){
        return null
    }

    if(!audioContext){
        audioContext = new window.AudioContext

        analyser = audioContext.createAnalyser()
        if(get(audioElement)){
            audioSource = audioContext.createMediaElementSource(get(audioElement))
            audioSource.connect(analyser)
            analyser.connect(audioContext.destination)
        }
    }

    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    return analyser
}

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