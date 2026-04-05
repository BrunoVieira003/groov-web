<script lang="ts">
    import ArtistAlbums from "$lib/components/artist-albums.svelte";
    import SongItemList from "$lib/components/song-item-list.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props()
</script>

<div class="w-full sm:w-10/12 mx-auto">
    <div class="mb-4 text-center sm:text-start">
        <p class="mb-1 text-sm">Artist</p>
        <h1 class="text-5xl mb-6">{data.artist?.name}</h1>
        <h2 class="text-2xl">Songs</h2>
    </div>

    <SongItemList 
    collectionId={data.artist?.id || ''} 
    collectionType='artist'
    collectionName={data.artist?.name}
    tracks={data.artist?.songs || []}
    />

    {#if data.artist?.albums && data.artist?.albums.length > 0}
        <h2 class="text-2xl mt-6">Albums</h2>
        <ArtistAlbums albums={data.artist.albums}/>
    {/if}
</div>