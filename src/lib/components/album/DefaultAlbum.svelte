<script lang="ts">
    import type { AlbumProps } from "./album-props";
    import Marquee from "../marquee.svelte";
    import ContextMenu, { type ContextAction } from "../context-menu/context-menu.svelte";
    import { goto } from "$app/navigation";
    import ArtistIcon from "$lib/assets/icons/artist.svg?raw";
    import { fallbackImage } from "$lib/plugins/fallbackImage";

    let { album }: AlbumProps = $props();

    let contextMenu = $state<ContextMenu>();

    function goToArtist() {
        if(album.artist){
            goto(`/artists/${album.artist.id}`);
        }
    }

    const actions: ContextAction[] = [
        {label: 'Go to artist', cmd: goToArtist}
    ]
</script>

<ContextMenu bind:this={contextMenu} {actions}/>

<a
    class="space-y-4 hover:bg-bg-hover p-4 rounded-md"
    href="/albums/{album.id}"
    oncontextmenu={contextMenu.show}
>
    <img
        src="/api/media/albums/{album.id}/cover"
        alt="album_cover_art"
        class="aspect-square! self-center w-full rounded-xl object-cover"
        {@attach fallbackImage}
    />
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
</a>
