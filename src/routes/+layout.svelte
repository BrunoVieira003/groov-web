<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import Player from '$lib/components/player.svelte';
    import Header from '$lib/components/header.svelte';
    import { currentSong } from '$lib/stores/currentSong';
    import { Toaster } from "svelte-hot-french-toast"
	
	let { children } = $props();

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


<Header/>
<Toaster position='top-end'/>
<div class="mx-8 mb-20">
	{@render children()}
</div>
<Player/>

