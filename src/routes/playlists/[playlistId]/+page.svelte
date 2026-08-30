<script lang="ts">
    import PlayAll from "$lib/components/buttons/play-all.svelte";
    import SongList from "$lib/components/song-list.svelte";
    import toast from "svelte-hot-french-toast";
    import type { PageProps } from "./$types";
    import { targetedSong } from "$lib/stores/songAction";
    import { invalidateAll } from "$app/navigation";

    let { data }: PageProps = $props()

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


<div class="w-full">
    <p class="mb-1 text-sm text-legend">Playlist</p>
    <h1 class="text-5xl mb-1 text-heading">{data.playlist?.title}</h1>
    <p class="text-sm text-legend mb-4">{data.playlist?.songs.length} {data.playlist && data.playlist?.songs.length > 1 ? 'songs': 'song'}</p>
    <PlayAll tracks={data.playlist?.songs || []} collection={ {id: data.playlist?.id || '', type: 'playlist', name: data.playlist?.title || ''} }/>
</div>

<SongList
collection={ {id: data.playlist?.id || '', type: 'playlist', name: data.playlist?.title || ''} }
tracks={data.playlist?.songs || []}
extraActions={[
    {label: 'Remove from playlist', cmd: () => removeFromPlaylist(data.playlist?.id)}
]}
/>