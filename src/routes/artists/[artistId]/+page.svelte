<script lang="ts">
    import ArtistAlbums from "$lib/components/artist-albums.svelte";
    import SongList from "$lib/components/song-list.svelte";
    import Tabs from "$lib/components/tabs.svelte";
    import { fallbackImage } from "$lib/plugins/fallbackImage";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props()

    let currentTab = $state("Songs")
</script>

<div>
    <div class="flex mb-4 text-center sm:text-start gap-10">
        <img class="size-50 rounded-full aspect-square" src="/api/media/artists/{data.artist?.id}/cover" alt="artist_cover" {@attach fallbackImage}>
        <div class="mt-4 mb-6">
            <p class="mb-1 text-sm text-legend">Artist</p>
            <h1 class="text-5xl mb-2 text-highlight">{data.artist?.name}</h1>
            <div class="flex gap-2">
                <p class="text-sm text-legend">{data.artist?.songs.length} songs</p>
            </div>
        </div>
    </div>

    <Tabs tabs={["Songs", "Albums"]} bind:currentTab>
        {#if currentTab === 'Songs'}
            <SongList 
            collection={ {id: data.artist?.id, type: 'artist', name: data.artist?.name || ''} }
            tracks={data.artist?.songs || []}
            />
        {:else if currentTab === 'Albums'}
            {#if data.artist?.albums && data.artist?.albums.length > 0}
                <ArtistAlbums albums={data.artist.albums}/>
            {/if}
        {/if}
    </Tabs>

    

</div>