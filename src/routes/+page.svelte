<script lang="ts">
    import type { PageProps } from "./$types";
    import SongItem from "$lib/components/song-item.svelte";
    import SongItemList from "$lib/components/song-item-list.svelte";

    let { data }: PageProps = $props()
</script>

<SongItemList>
    {#each data.songs as song}
       <SongItem {song}/>
    {/each}
</SongItemList>