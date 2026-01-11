<script lang="ts">
    import type { PageProps } from "./$types";
    import {currentSong} from '$lib/stores/currentSong'
    import SongItem from "$lib/components/song-item.svelte";

    let { data }: PageProps = $props()
</script>

<div class="flex flex-col mx-auto w-fit gap-6">
    {#each data.songs as song}
       <SongItem {song}/>
    {/each}
</div>