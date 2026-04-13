<script lang="ts">
    import ArtistAlbums from "$lib/components/artist-albums.svelte";
    import SongList from "$lib/components/song-list.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props()
</script>

<div class="w-11/12 sm:w-10/12 mx-auto">
    <div class="mb-4 text-center sm:text-start">
        <p class="mb-1 text-sm text-legend">Artist</p>
        <h1 class="text-5xl mb-6 text-highlight">{data.artist?.name}</h1>
        <h2 class="text-2xl text-heading">Songs</h2>
    </div>

    <SongList 
    collectionId={data.artist?.id || ''} 
    collectionType='artist'
    collectionName={data.artist?.name}
    tracks={data.artist?.songs || []}
    />

    {#if data.artist?.albums && data.artist?.albums.length > 0}
        <h2 class="text-2xl mt-6 text-heading">Albums</h2>
        <ArtistAlbums albums={data.artist.albums}/>
    {/if}
</div>