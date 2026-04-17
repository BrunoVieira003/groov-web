<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import type { PageProps } from "./$types";
    import emptyImage from '$lib/assets/images/empty.png'
    import Marquee from "$lib/components/marquee.svelte";
    import { goto } from "$app/navigation";
    import { albumLayout } from "$lib/stores/settings";
    import Cassete from "$lib/components/cassete.svelte";
    import DefaultAlbum from "$lib/components/album/DefaultAlbum.svelte";
    import { songQueue } from "$lib/stores/queue";

    let { data }: PageProps = $props()

    // svelte-ignore non_reactive_update
    let coverImage: HTMLImageElement
</script>


<h1 class="page-title w-fit not-sm:mx-auto">Albums</h1>
<h2 class="w-fit not-sm:mx-auto">{data.albums?.length} albums</h2>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
    {#each data.albums as album}
        {#if $albumLayout === 'default'}
            <DefaultAlbum album={album}/>
        {:else}
            <a href="/albums/{album.id}" class="hover:brightness-115">
                <Cassete title={album.title} coverImageSrc="{PUBLIC_API_URL}/albums/{album.id}/cover" spinning={$songQueue.collectionId === album.id && !$songQueue.paused}/>
            </a>
        {/if}
    {/each}
</div>