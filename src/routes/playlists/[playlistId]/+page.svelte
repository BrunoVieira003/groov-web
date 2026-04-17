<script lang="ts">
    import PlayAll from "$lib/components/buttons/play-all.svelte";
    import SongList from "$lib/components/song-list.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props()
</script>

<div class="w-full sm:w-10/12 sm:mx-auto">
    <div class="w-fit not-sm:mx-auto not-sm:text-center">
        <p class="mb-1 text-sm text-legend">Playlist</p>
        <h1 class="text-5xl mb-1 text-highlight">{data.playlist?.title}</h1>
        <p class="text-sm text-legend mb-4">{data.playlist?.songs.length} {data.playlist && data.playlist?.songs.length > 1 ? 'songs': 'song'}</p>
        <PlayAll tracks={data.playlist?.songs || []} collection={ {id: data.playlist?.id || '', type: 'playlist', name: data.playlist?.title || ''} }/>
    </div>

    <SongList
    collection={ {id: data.playlist?.id || '', type: 'playlist', name: data.playlist?.title || ''} }
    tracks={data.playlist?.songs || []}
    />
</div>