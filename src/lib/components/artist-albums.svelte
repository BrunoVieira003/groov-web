<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import type { AlbumSummary } from "$lib/types/album";
    import emptyImage from '$lib/assets/images/empty.png'
    import Marquee from "./marquee.svelte";
    import DefaultAlbum from "./album/DefaultAlbum.svelte";
    import { albumLayout } from "$lib/stores/settings";
    import { songQueue } from "$lib/stores/queue";
    import Cassete from "./cassete.svelte";

    interface PropsType{
        albums: AlbumSummary[]
    }

    let { albums }: PropsType = $props()

    // svelte-ignore non_reactive_update
        let coverImage: HTMLImageElement
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
    {#each albums as album}
        {#if $albumLayout === 'default'}
            
        <DefaultAlbum album={album}/>
        {:else}
        <a href="/albums/{album.id}" class="hover:brightness-115">
            <Cassete title={album.title} coverImageSrc="{PUBLIC_API_URL}/albums/{album.id}/cover" spinning={$songQueue.collectionId === album?.id}/>
        </a>
        {/if}
    {/each}
</div>