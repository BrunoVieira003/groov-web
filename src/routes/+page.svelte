<script lang="ts">
    import type { PageProps } from "./$types";
    import SongItem from "$lib/components/song-item.svelte";
    import SongItemList from "$lib/components/song-item-list.svelte";

    let { data }: PageProps = $props()
</script>

<h1 class="page-title">Songs</h1>
<SongItemList>
    {#each data.songs as song}
       <SongItem {song}/>
    {/each}
</SongItemList>