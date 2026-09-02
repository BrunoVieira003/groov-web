<script lang="ts">
    import type { AlbumProps } from "./album-props";
    import ContextMenu, { type ContextAction } from "../context-menu/context-menu.svelte";
    import { goto } from "$app/navigation";
    import Cassete from "../cassete.svelte";
    import { songQueue } from "$lib/stores/queue";
    import { paused } from "$lib/stores/player";

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
<a href="/albums/{album.id}" class="hover:brightness-115">
    <Cassete
        title={album.title}
        sidetitle={album?.artist?.name}
        spinning={$songQueue.collection?.id === album.id &&
            !$paused}
    />
</a>