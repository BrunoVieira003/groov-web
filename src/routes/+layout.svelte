<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import Player from '$lib/components/player.svelte';
    import Header from '$lib/components/header.svelte';
    import { currentSong } from '$lib/stores/currentSong';
    import { Toaster } from "svelte-hot-french-toast"
    import { PUBLIC_API_URL } from '$env/static/public';
    import { currentTime, duration } from '$lib/stores/audioState';
    import { songQueue } from '$lib/stores/queue';
	
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

<Header/>
<Toaster position='top-end'/>
<div class="mx-8 mb-20">
	{@render children()}
</div>
<Player/>

