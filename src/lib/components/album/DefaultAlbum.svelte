<script lang="ts">
    import type { AlbumProps } from "./album-props";
    import Marquee from "../marquee.svelte";
    import ContextMenu, { type ContextAction } from "../context-menu/context-menu.svelte";
    import { goto } from "$app/navigation";
    import ArtistIcon from "$lib/assets/icons/artist.svg?raw";
    import { fallbackImage } from "$lib/plugins/fallbackImage";
    import type Song from "$lib/types/song";
    import { songQueue } from "$lib/stores/queue";
    import PlayButton from "../player/buttons/play-button.svelte";
    import playIcon from "$lib/assets/icons/play.svg?raw"
    import { fly, slide } from "svelte/transition";

    let { album }: AlbumProps = $props();

    let contextMenu = $state<ContextMenu>();

    let isHovering = $state(false) 

    function goToArtist() {
        if(album.artist){
            goto(`/artists/${album.artist.id}`);
        }
    }

    function playAlbum(e: any){
        e.stopPropagation()
        fetch(`/api/albums/${album.id}`)
        .then(response => response.json())
        .then(data => {
            const songs = data.songs as Song[]
            songQueue.playQueue(songs, 0, {
                id: album.id,
                name: album.title,
                type: 'album',
            })
        })
        .finally(contextMenu?.hide)
    }

    const actions: ContextAction[] = [
        {label: 'Go to artist', cmd: goToArtist},
        {label: 'Play album', cmd: playAlbum},
    ]
</script>

<ContextMenu bind:this={contextMenu} {actions}/>

<button
    class="space-y-4 hover:bg-bg-hover p-4 rounded-md cursor-pointer"
    onclick={() => goto(`/albums/${album.id}`)}
    oncontextmenu={contextMenu.show}
    onmouseenter={() => isHovering = true}
    onmouseleave={() => isHovering = false}
    tabindex="-1"
>
    <div class="relative">
        <img
            src="/api/albums/{album.id}/cover"
            alt="album_cover_art"
            class="aspect-square! self-center w-full rounded-xl object-cover"
            {@attach fallbackImage}
        />
        {#if isHovering}
            <div class="absolute bottom-1/12 right-1/12 -translate-y-8 h-0">
                <!-- svelte-ignore node_invalid_placement_ssr -->
                <button transition:fly={{y: 1, duration: 400}} class="size-10 p-1 border-2 border-border bg-surface hover:bg-surface-hover rounded-full text-white cursor-pointer" onclick={playAlbum}>{@html playIcon}</button>
            </div>
        {/if}
    </div>
    <div>
        <div class="flex">
            <Marquee>
                <p class="text-nowrap text-heading font-bold">{album.title}</p>
            </Marquee>
            <p>{album.year}</p>
        </div>
        {#if album.artist}
            <Marquee
                ><a
                    href="/artists/{album.artist.id}"
                    class="hover:underline text-sm text-subheading"
                    >{album.artist.name}</a
                ></Marquee
            >
        {/if}
    </div>
</button>
