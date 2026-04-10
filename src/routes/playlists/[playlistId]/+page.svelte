<script lang="ts">
    import PlayAll from "$lib/components/buttons/play-all.svelte";
    import SongItemList from "$lib/components/song-item-list.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props()
</script>

<div class="w-full sm:w-10/12 sm:mx-auto">
    <div class="">
        <p class="mb-1 text-sm text-legend">Playlist</p>
        <h1 class="text-5xl mb-1 text-highlight">{data.playlist?.title}</h1>
        <p class="text-sm text-legend mb-4">{data.playlist?.songs.length} {data.playlist && data.playlist?.songs.length > 1 ? 'songs': 'song'}</p>
        <PlayAll tracks={data.playlist?.songs || []} collectionType='playlist' collectionName={data.playlist?.title} collectionId={data.playlist?.id || ''}/>
    </div>

    <SongItemList
    collectionId={data.playlist?.id || ''}
    collectionType='playlist'
    collectionName={data.playlist?.title}
    tracks={data.playlist?.songs || []}
    />
</div>