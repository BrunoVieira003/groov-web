<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import Player from '$lib/components/player.svelte';
    import Header from '$lib/components/header.svelte';
    import { currentSong } from '$lib/stores/currentSong';
    import { songQueue } from '$lib/stores/queue';
	
	let { children } = $props();

	let title = $derived(() => {
		if($currentSong){
			return $currentSong.title + " - " + $currentSong.authors.map(a => a.artist.name).at(0) + " | Groov"
		}

		return "Groov"
	})

	if(navigator.mediaSession){
		navigator.mediaSession.setActionHandler('pause', songQueue.togglePlay)
		navigator.mediaSession.setActionHandler('nexttrack', songQueue.nextTrack)
		navigator.mediaSession.setActionHandler('previoustrack', songQueue.previousTrack)
	}

	currentSong.subscribe((song) => {
		if(song && navigator.mediaSession){
			navigator.mediaSession.metadata = new MediaMetadata({
				title: song.title,
				artist: song.authors.map(a => a.artist.name).join(', '),
			})
		}
	})
</script>

<svelte:head>
	<title>{title()}</title>
	<link rel="icon" href={favicon} />
</svelte:head>


<Header/>
<div class="mx-8 mb-20">
	{@render children()}
</div>
<Player/>

