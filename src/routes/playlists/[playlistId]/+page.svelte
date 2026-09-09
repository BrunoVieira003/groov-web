<script lang="ts">
    import PlayAll from "$lib/components/buttons/play-all.svelte";
    import SongList from "$lib/components/song-list.svelte";
    import toast from "svelte-hot-french-toast";
    import type { PageProps } from "./$types";
    import { targetedSong } from "$lib/stores/songAction";
    import { invalidateAll } from "$app/navigation";
    import { fallbackImage } from "$lib/plugins/fallbackImage";
    import EditIcon from "$lib/assets/icons/edit.svg?raw";
    import { editable } from "$lib/plugins/editable";

    let { data }: PageProps = $props()

    let editing = $state(false)

    function updatePlaylist(playlistId: string | undefined, title: string){
        if (!playlistId) return;

        fetch(`/api/playlists/${playlistId}`, {
            method: "PATCH",
            body: JSON.stringify({
                title
            }),
        })
            .then(() => {
                toast.success("Title updated");
            })
            .catch(() => {
                toast.error("Failed to update title from playlist");
            })
            .finally(async () => {
                await invalidateAll();
                editing = false
            });
    }

    function removeFromPlaylist(playlistId: string | undefined) {
        if (!playlistId) return;

        fetch(`/api/playlists/${playlistId}/song`, {
            method: "DELETE",
            body: JSON.stringify({ relationId: $targetedSong?.relationId }),
        })
            .then(() => {
                toast.success("Song removed from playlist");
            })
            .catch(() => {
                toast.error("Failed to remove song from playlist");
            })
            .finally(async () => {
                await invalidateAll();
            });
    }
</script>


<div class="w-full flex gap-6 mx-2 sm:mx-auto mb-6">
    <img
    src="/api/playlists/{data.playlist?.id}/cover"
    alt="album_cover_art"
    class="aspect-square! self-center size-80 rounded-xl object-cover volume-shadow"
    {@attach fallbackImage}
    >

    <div class="w-fit max-w-10/12">
        <p class="mb-1 text-sm text-legend">Playlist</p>
        <div class="flex gap-4">
            <h1 
            class="text-5xl mb-1 text-heading"
            class:editable={editing}
            {@attach editable(
                data.playlist?.title, 
                (v) => updatePlaylist(data.playlist?.id, v), 
                editing
            )}
            >
            {""}
            </h1>
            <button type="button" onclick={() => editing = true } class="size-6 text-legend hover:text-heading cursor-pointer">{@html EditIcon}</button>
        </div>
        <p class="text-sm text-legend mb-4">{data.playlist?.songs.length} {data.playlist && data.playlist?.songs.length > 1 ? 'songs': 'song'}</p>
        <PlayAll tracks={data.playlist?.songs || []} collection={ {id: data.playlist?.id || '', type: 'playlist', name: data.playlist?.title || ''} }/>
    </div>
</div>

<SongList
collection={ {id: data.playlist?.id || '', type: 'playlist', name: data.playlist?.title || ''} }
tracks={data.playlist?.songs || []}
extraActions={[
    {label: 'Remove from playlist', cmd: () => removeFromPlaylist(data.playlist?.id)}
]}
/>

<style>
    .editable{
        outline: none;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        background-color: var(--color-surface);
        padding: 0.4rem;
        border-radius: 0.8rem;
    }
</style>