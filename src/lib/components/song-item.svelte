<script lang="ts">
    import api from "$lib/plugins/api";
    import { currentSong } from "$lib/stores/currentSong";
    import { songQueue } from "$lib/stores/queue";
    import type Song from "$lib/types/song";
    import toast from "svelte-hot-french-toast";
    import ArtistsLabel from "./artists-label.svelte";
    import ContextMenu from "./context-menu.svelte";
    import PlaylistSelect from "./forms/playlist-select.svelte";
    import PlayButton from "./player/buttons/play-button.svelte";
    import { getCollectionContext } from "$lib/contexts/collection-context";
    import { invalidateAll } from "$app/navigation";
    import Submenu from "./submenu.svelte";
    import { fly } from "svelte/transition";

    interface PropsType{
        song: Song
        onPlayClick: (songId?: string) => void
    }

    let contextMenu = $state<ContextMenu>()

    let { song, onPlayClick }: PropsType = $props()

    let selected = $derived(() => $currentSong?.id === song.id)

    let collectionContext = getCollectionContext()

    function clickCallback(){
        if(selected()){
            songQueue.togglePlay()
            return
        }

        onPlayClick(song.id)
    }

    function addToPlaylist(playlistId: string){
        api.post(`/playlists/${playlistId}/song`, {
            songId: song.id
        })
        .then(() => {
            toast.success('Song added to playlist')
        })
        .catch(() => {
            toast.error('Failed to add song to playlist')
        })
        .finally(contextMenu?.hide)
    }

    function removeFromPlaylist(playlistId: string){
        api.delete(`/playlists/${playlistId}/song`, {data: {songId: song.id} })
        .then(() => {
            toast.success('Song removed from playlist')
        })
        .catch(() => {
            toast.error('Failed to remove song from playlist')
        })
        .finally(async () => {
            contextMenu?.hide()
            await invalidateAll()

        })
    }
</script>

<ContextMenu bind:this={contextMenu}>
    <div class="flex flex-col">
        <p class="font-semibold text-gray-300 text-sm text-center py-2 w-full mx-auto">Options</p>
        <Submenu label="Add to playlist" labelClass="w-full px-4 py-2 hover:bg-slate-700 cursor-pointer">
            <PlaylistSelect onPick={addToPlaylist}/>
        </Submenu>
        {#if collectionContext.collectionType === 'playlist'}
            <button class="text-md cursor-pointer px-4 py-2" onclick={() => removeFromPlaylist(collectionContext.collectionId)}>Remove from playlist</button>
        {/if}
    </div>
</ContextMenu>

<div
class="grid grid-cols-2 md:grid-cols-3 items-center justify-start gap-10 p-4 rounded-md hover:bg-gray-900 data-[active=true]:bg-gray-800"
data-active={selected()}
oncontextmenu={contextMenu.show}
role="button"
tabindex="-1"
transition:fly={{ duration: 100 }}
>
    <div class="flex items-center gap-4">
        <PlayButton paused={!selected() || $songQueue.paused} onclick={clickCallback}/>
        <p class="w-1/2 line-clamp-3">{song.title}</p>
    </div>
    <ArtistsLabel artists={song.authors}/>
    {#if song.album}
        <a href="/albums/{song.album.id}" class="hidden md:block hover:underline">{song.album.title}</a>
    {/if}
</div>