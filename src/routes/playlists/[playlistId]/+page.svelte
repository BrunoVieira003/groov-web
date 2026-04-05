<script lang="ts">
    import SongItemList from "$lib/components/song-item-list.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props()
</script>

<div class="w-full sm:w-10/12 sm:mx-auto">
    <div class="mb-6">
        <p class="mb-1 text-sm">Playlist</p>
        <h1 class="text-5xl mb-6">{data.playlist?.title}</h1>
        <p class="text-sm">{data.playlist?.songs.length} {data.playlist && data.playlist?.songs.length > 1 ? 'songs': 'song'}</p>
    </div>
    <SongItemList
    collectionId={data.playlist?.id || ''}
    collectionType='playlist'
    collectionName={data.playlist?.title}
    tracks={data.playlist?.songs || []}
    />
</div>