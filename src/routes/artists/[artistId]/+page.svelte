<script lang="ts">
    import ArtistAlbums from "$lib/components/artist-albums.svelte";
    import SongList from "$lib/components/song-list.svelte";
    import Tabs from "$lib/components/tabs.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props()

    let currentTab = $state("Songs")
</script>

<div class="w-11/12 sm:w-10/12 mx-auto">
    <div class="mb-4 text-center sm:text-start">
        <p class="mb-1 text-sm text-legend">Artist</p>
        <h1 class="text-5xl mb-6 text-highlight">{data.artist?.name}</h1>
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