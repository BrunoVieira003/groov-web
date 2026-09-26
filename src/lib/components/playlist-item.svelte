<script lang="ts">
    import { fallbackImage } from "$lib/plugins/fallbackImage"
    import type { PlaylistSummary } from "$lib/types/playlist"
    import trashIcon from "$lib/assets/icons/trash.svg?raw"
    import toast from "svelte-hot-french-toast";
    import { invalidateAll } from "$app/navigation";
    import type { MouseEventHandler } from "svelte/elements";

    interface PropsType{
        playlist : PlaylistSummary
        onclick?: MouseEventHandler<HTMLDivElement>
    }

    let { playlist, onclick }: PropsType = $props()

    function deletePlaylist(e: any, playlistId: string){
        e.stopPropagation()
        fetch(`/api/playlists/${playlistId}`, {method: 'delete'})
        .then(() => toast.success('Playlist removed'))
        .catch(() => toast.error('Failed to remove playlist'))
        .finally(() => invalidateAll())
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div {onclick} role="button" tabindex="-1" class="grid grid-cols-[1fr_auto] items-center p-4 rounded-md hover:bg-bg-hover cursor-pointer w-full">
    <div class="flex items-center gap-4">
        <img
        src="/api/playlists/{playlist.id}/cover"
        alt="album_cover_art"
        class="aspect-square! self-center size-12 rounded-xl object-cover"
        {@attach fallbackImage}
        >
        <p class="text-subheading">{playlist.title}</p>
    </div>
    <button class="text-heading cursor-pointer bg-surface hover:bg-surface-hover hover:text-danger p-2 rounded-md" onclick={(e) => deletePlaylist(e, playlist.id || '')}>
        {@html trashIcon}
    </button>
</div>