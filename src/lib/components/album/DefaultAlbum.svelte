<script lang="ts">
    import { env } from "$env/dynamic/public";
    import type { AlbumProps } from "./album-props";
    import emptyImage from "$lib/assets/images/empty.png";
    import Marquee from "../marquee.svelte";
    import ContextMenu from "../context-menu/context-menu.svelte";
    import ContextMenuButton from "../context-menu/context-menu-button.svelte";
    import { goto } from "$app/navigation";
    import ArtistIcon from "$lib/assets/icons/artist.svg?raw"

    let { album }: AlbumProps = $props();

    let coverImage: HTMLImageElement;
    let contextMenu = $state<ContextMenu>()

    function goToArtist(){
        goto(`/artists/${album.artist.id}`)
    }
</script>

<ContextMenu bind:this={contextMenu} title="Options">
    <ContextMenuButton onclick={goToArtist} class="flex items-center gap-2">
        <div class="size-7">{@html ArtistIcon}</div>
        Go to artist
    </ContextMenuButton>
</ContextMenu>

<a
    class="space-y-4 hover:bg-neutral-medium p-4 rounded-md"
    href="/albums/{album.id}"
    oncontextmenu={contextMenu.show}
>
    <img
        bind:this={coverImage}
        src="{env.PUBLIC_API_URL}/albums/{album.id}/cover"
        alt="album_cover_art"
        class="aspect-square! self-center w-full rounded-xl object-cover"
        onerror={() => (coverImage.src = emptyImage)}
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
