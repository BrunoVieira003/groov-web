<script lang="ts">
    import { setCollectionContext, type CollectionType } from "$lib/contexts/collection-context";
    import type Song from "$lib/types/song";
    import { type Snippet } from "svelte";
    import SongItem from "./song-item.svelte";

    interface props{
        collectionId?: string
        collectionType?: CollectionType
        collectionName: string | undefined
        tracks: Song[]
    }

    let props: props = $props()
    setCollectionContext({
        collectionId: props.collectionId,
        collectionType: props.collectionType || 'other',
        collectionName: props.collectionName,
        tracks: props.tracks
    })
</script>

<div class="relative flex flex-col w-full">
    <div class="sticky w-full -top-6 bg-gray-950 grid grid-cols-1 md:grid-cols-2 items-center justify-start gap-2 p-4">
        <p class="font-bold text-sm opacity-80">Title</p>
        <p class="hidden md:block font-bold text-sm opacity-80">Album</p>
    </div>
    {#each props.tracks as song}
        <SongItem song={song}/>
    {/each}
</div>