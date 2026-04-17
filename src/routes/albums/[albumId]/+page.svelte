<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import emptyImage from '$lib/assets/images/empty.png'
    import type { PageProps } from "./$types";
    import PlayAll from "$lib/components/buttons/play-all.svelte";
    import SongList from "$lib/components/song-list.svelte";
    import { albumLayout } from "$lib/stores/settings";
    import Cassete from "$lib/components/cassete.svelte";
    import { songQueue } from "$lib/stores/queue";

    let { data }: PageProps = $props()

    let coverImage: HTMLImageElement
</script>

<div class="w-full flex flex-col md:flex-row data-[layout=default]:flex-col gap-4 sm:w-10/12 sm:mx-auto items-start" data-layout="{$albumLayout}">
    {#if $albumLayout === 'default'}      
        <div class="mb-6">
            <div class="flex flex-col sm:flex-row justify-center sm:justify-start gap-6 mx-2 sm:mx-auto">
                <img
                bind:this={coverImage}
                src="{PUBLIC_API_URL}/albums/{data.album?.id}/cover"
                alt="album_cover_art"
                class="aspect-square! self-center size-60 rounded-xl object-cover volume-shadow"
                onerror={() => coverImage.src = emptyImage}
                >
                <div class="flex flex-col mx-auto text-center justify-center sm:text-start sm:mx-0 sm:justify-between">
                    <div>
                        <h1 class="text-5xl mb-2 text-highlight">{data.album?.title}</h1>
                        <a href="/artists/{data.album?.artist.id}" class="text-xl mb-6 hover:underline text-subheading">{data.album?.artist.name}</a>
                        <p class="text-sm text-legend">{data.album?.songs.length} {data.album && data.album?.songs.length > 1 ? 'songs': 'song'}</p>
                    </div>
                    <PlayAll tracks={data.album?.songs || []} collectionId={data.album?.id || ''} collectionType='album' collectionName={data.album?.title}/>
                </div>
            </div>
        </div>
    {:else}
        <div class="flex flex-col w-10/12 md:w-1/3 mx-auto mt-2 sm:mt-4 *:h-fit md:gap-4 items-center">
            <div class="volume-shadow">
                <Cassete title={data.album?.title} coverImageSrc="{PUBLIC_API_URL}/albums/{data.album?.id}/cover" spinning={$songQueue.collectionId === data.album?.id}/>
            </div>
            <PlayAll tracks={data.album?.songs || []} collectionId={data.album?.id || ''} collectionType='album' collectionName={data.album?.title}/>
        </div>
    {/if}

    <SongList 
    tracks={data.album?.songs || []}
    collectionId={data.album?.id || ''} 
    collectionType='album'
    collectionName={data.album?.title}
    />
</div>

<style>
    .volume-shadow{
        box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.05),
        0px 0px 12px rgba(0, 0, 0, 0.1),
        0px 0px 28px rgba(0, 0, 0, 0.2),
        0px 0px 49px rgba(0, 0, 0, 0.4);
    }
</style>