<script lang="ts">
    import type { PageProps } from "./$types";
    import SongItem from "$lib/components/song-item.svelte";

    let { data }: PageProps = $props()
</script>

<div class="flex flex-col mx-auto w-11/12 lg:w-9/12 gap-6">
    {#each data.songs as song}
       <SongItem {song}/>
    {/each}
</div>