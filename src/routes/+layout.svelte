<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import Player from '$lib/components/player/default-player.svelte';
    import Header from '$lib/components/header.svelte';
    import { currentSong } from '$lib/stores/currentSong';
    import { Toaster } from "svelte-hot-french-toast"
    import { PUBLIC_API_URL } from '$env/static/public';
    import { currentTime, duration } from '$lib/stores/audioState';
    import { songQueue } from '$lib/stores/queue';
    import { viewMode } from '$lib/stores/viewMode';
    import FullPlayer from '$lib/components/player/full-player.svelte';
    import TaskList from '$lib/components/task-list.svelte';
	
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
                artwork: [
                    {src: `${PUBLIC_API_URL}/songs/${song.id}/cover`}
                ]
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
autoplay
onended={handleTrackEnd}
>
	<source bind:this={source}/>
</audio>
<Toaster position='top-end'/>

{#if $viewMode === 'default'}
<div class="flex flex-col w-full mx-auto h-screen">
    <Header/>
    <div class="relative overflow-y-auto flex-1 px-30 pt-6 mb-2">
        {@render children()}
    </div>
    <Player/>
</div>
{/if}
{#if $viewMode === 'full'}
	<FullPlayer/>
{/if}

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
        background-color: #24262c;
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #434652;
    }
</style>
