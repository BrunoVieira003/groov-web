<script lang="ts">
    import api from "$lib/plugins/api";
    import { currentSong } from "$lib/stores/currentSong";
    import { songQueue } from "$lib/stores/queue";
    import type Song from "$lib/types/song";
    import toast from "svelte-hot-french-toast";
    import ArtistsLabel from "./artists-label.svelte";
    import ContextMenu from "./context-menu.svelte";
    import PlaylistSelect from "./forms/playlist-select.svelte";
    import PlayButton from "./play-button.svelte";

    interface PropsType{
        song: Song
        onPlayClick: (songId?: string) => void
    }

    let contextMenu = $state<ContextMenu>()

    let { song, onPlayClick }: PropsType = $props()

    let selected = $derived(() => $currentSong?.id === song.id)

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

        contextMenu?.hide()
    }
</script>

<ContextMenu bind:this={contextMenu}>
    <p class="p-4 text-md cursor-default">Add to playlist</p>
    <PlaylistSelect onPick={addToPlaylist}/>
</ContextMenu>

<div
class="flex items-center justify-start gap-10 p-4 rounded-md hover:bg-gray-900 data-[active=true]:bg-gray-800"
data-active={selected()}
oncontextmenu={contextMenu.show}
role="button"
tabindex="-1"
>
    <PlayButton paused={!selected() || $songQueue.paused} onclick={clickCallback}/>
    <p class="w-1/2 line-clamp-1">{song.title}</p>
    <ArtistsLabel artists={song.authors}/>
</div>