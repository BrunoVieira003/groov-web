<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import Player from '$lib/components/player.svelte';
    import Header from '$lib/components/header.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
	<title>Groov</title>
	<link rel="icon" href={favicon} />
</svelte:head>


<Header/>
<div class="mx-8 mb-20">
	{@render children()}
</div>
<Player/>

