<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import Player from '$lib/components/player/default-player.svelte';
    import Header from '$lib/components/header.svelte';
    import { currentSong } from '$lib/stores/currentSong';
    import { Toaster } from "svelte-hot-french-toast"
    import { PUBLIC_API_URL } from '$env/static/public';
    import { currentTime, currentVolume, duration } from '$lib/stores/audioState';
    import { songQueue } from '$lib/stores/queue';
    import { viewMode } from '$lib/stores/viewMode';
    import FullPlayer from '$lib/components/player/full-player.svelte';
    import TaskList from '$lib/components/task-list.svelte';
    import { randomNoSongPhrases } from '$lib/plugins/phrases';
    import { fly } from 'svelte/transition';
	
	let { children } = $props();

	let audio: HTMLAudioElement;
	let source = $state<HTMLSourceElement>();

	currentSong.subscribe((song) => {
        if (source && song && navigator.mediaSession) {
            source.src = `${PUBLIC_API_URL}/songs/${song.id}`;
            audio.load();

            navigator.mediaSession.metadata = new MediaMetadata({
                title: song.title,
                artist: song.authors.map(a => a.name).join(', '),
                album: song.album.title,
                artwork: [
                    {src: `${PUBLIC_API_URL}/songs/${song.id}/cover`}
                ]
            })

            navigator.mediaSession.setActionHandler('pause', songQueue.togglePlay)
            navigator.mediaSession.setActionHandler('nexttrack', songQueue.nextTrack)
            navigator.mediaSession.setActionHandler('previoustrack', songQueue.previousTrack)
            navigator.mediaSession.setActionHandler('seekforward', ({seekOffset}) => $currentTime += seekOffset ?? 5)
            navigator.mediaSession.setActionHandler('seekbackward', ({seekOffset}) => $currentTime -= seekOffset ?? 5)
            navigator.mediaSession.setActionHandler('seekto', ({seekTime}) => {
                if(seekTime){
                    $currentTime = seekTime
                }
            })
        }
    });

	function handleTrackEnd(){
        songQueue.nextTrack()
    }

	let title = $derived(() => {
		if($currentSong){
			return $currentSong.title + " - " + $currentSong.authors.map(a => a.name).at(0) + " | Groov"
		}

		return "Groov"
	})
</script>

<svelte:head>
	<title>{title()}</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<audio
class="hidden"
bind:this={audio}
bind:duration={$duration}
bind:currentTime={$currentTime}
bind:paused={$songQueue.paused}
bind:volume={$currentVolume}
autoplay
onended={handleTrackEnd}
>
	<source bind:this={source}/>
</audio>
<Toaster position='top-end'/>

{#snippet emptyPlayer()}
    <div class="text-white flex items-center justify-center lg:justify-evenly w-full px-2 sm:px-10 lg:px-20 sm:gap-4 py-10 h-10 bottom-0 bg-neutral-medium">
        <p class="font-bold">{randomNoSongPhrases()}</p>
    </div>
{/snippet}

<div class="flex flex-col w-full mx-auto h-screen bg-neutral-dark overflow-hidden">
    {#if $viewMode === 'default'}
        <Header/>
    {/if}
    <div class="relative overflow-y-auto flex-1 lg:px-30 pt-6 mb-2">
        {@render children()}
    </div>
    {#if $currentSong}
        {#if $viewMode === 'full'}
            <FullPlayer/>
        {:else}
            <Player/>
        {/if}
    {:else}
        {@render emptyPlayer()}
    {/if}
</div>

<TaskList/>

<style>
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--color-neutral-medium);
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: var(--color-neutral-lighter);
    }
</style>
