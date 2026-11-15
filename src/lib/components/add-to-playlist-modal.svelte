<script lang="ts">
    import { API_URL } from "$lib";
    import { beforeNavigate } from "$app/navigation";
    import toast from "svelte-hot-french-toast";
    import Modal from "./modal.svelte";
    import PlaylistSelect from "./forms/playlist-select.svelte";
    import { addToPlaylistTarget } from "$lib/stores/songAction";

    // Single instance, mounted once in the root layout.
    // Any song row opens it with `addToPlaylistTarget.set(song)`.

    beforeNavigate(() => addToPlaylistTarget.set(null))

    async function addToPlaylist(playlistId: string) {
        const song = $addToPlaylistTarget
        if (!song?.id || !playlistId) return

        try {
            const response = await fetch(`${API_URL}/playlists/${playlistId}/song`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ songId: song.id }),
            })
            if (!response.ok) throw new Error(`HTTP ${response.status}`)

            toast.success("Song added to playlist")
            addToPlaylistTarget.set(null)
        } catch (e) {
            toast.error("Failed to add song to playlist")
        }
    }
</script>

<Modal
    title="Add to playlist"
    bind:open={
        () => $addToPlaylistTarget !== null,
        (value) => { if (!value) addToPlaylistTarget.set(null) }
    }
>
    <p class="text-subheading mb-4">
        Choose a playlist to add
        <span class="text-heading font-semibold break-words">{$addToPlaylistTarget?.title}</span>
    </p>
    <PlaylistSelect onPick={addToPlaylist}/>
</Modal>
