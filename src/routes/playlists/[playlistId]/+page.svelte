<script lang="ts">
    import PlayAll from "$lib/components/buttons/play-all.svelte";
    import SongList from "$lib/components/song-list.svelte";
    import toast from "svelte-hot-french-toast";
    import type { PageProps, SubmitFunction } from "./$types";
    import { targetedSong } from "$lib/stores/songAction";
    import { invalidateAll } from "$app/navigation";
    import { fallbackImage } from "$lib/plugins/fallbackImage";
    import EditIcon from "$lib/assets/icons/edit.svg?raw";
    import { editable } from "$lib/plugins/editable";
    import Modal from "$lib/components/modal.svelte";
    import { applyAction, enhance } from "$app/forms";

    let { data }: PageProps = $props()

    let editing = $state(false)
    let pictureModal = $state<Modal>()
    let editPictureButton = $state(false)
    let pictures = $state<FileList | null>(null)
    let coverVersion = $state(0)
    let pictureSrc = $derived(`/api/playlists/${data.playlist?.id}/cover?v=${coverVersion}`)

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

    const updateShowToast: SubmitFunction = ({submitter}) => {
        return async ({result, update}) => {
            if(submitter)
            switch(result.type){
                case 'success': toast.success("Playlist picture successfully updated"); break;
                case 'error': toast.success("Failed to update playlist picture"); break;
            }
            
            coverVersion++
            await update()
            pictureModal?.hide()
        }
    }

    function clearPictureForm(closeModal: boolean = true){
        pictures = null
        if(closeModal){
            pictureModal?.hide()
        }
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
    <div class="relative"
    role="alert"
    onmouseenter={() => editPictureButton = true}
    onmouseleave={() => editPictureButton = false}
    >
        <img
        src={pictureSrc}
        alt="album_cover_art"
        class="aspect-square! self-center size-80 rounded-xl object-cover volume-shadow"
        {@attach fallbackImage}
        >

        {#if editPictureButton}
            <button
            class="absolute bottom-0 right-0 text-heading bg-background p-2 size-10 rounded-tl-lg cursor-pointer"
            onclick={() => pictureModal?.show()}
            >
            {@html EditIcon}
        </button>
        {/if}
    </div>

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

<Modal bind:this={pictureModal}>
    <form class="flex flex-col gap-4" method="POST" action="?/updateCover" enctype="multipart/form-data" use:enhance={updateShowToast}>
        <h1 class="page-title text-heading">Choose picture for playlist</h1>
        <input name="file" bind:files={pictures} id="picture" type="file" class="hidden"/>
        {#if pictures && pictures.length > 0}
            <div class="flex w-full justify-center items-center gap-4">
                <p class="self-center p-4 text-heading bg-surface-active rounded-md">{pictures.item(0)?.name}</p>
                <button type="button" onclick={() => clearPictureForm(false)} class="text-subheading text-sm cursor-pointer hover:bg-surface-hover p-2 rounded-md">Clear</button>
            </div>
            <div class="flex w-full gap-2 justify-end">
                <button type="button" onclick={() => clearPictureForm()} class="bg-surface-hover text-heading rounded-md p-2 w-fit cursor-pointer">Cancel</button>
                <button type="submit" class="bg-surface-hover text-heading rounded-md p-2 w-fit cursor-pointer">Submit</button>
            </div>
        {:else}
            <label for="picture" class="hover:bg-surface-hover aspect-square self-center flex items-center justify-center font-semibold text-subheading size-80 rounded-xl border-4 border-subheading border-dashed cursor-pointer">Choose picture...</label>
        {/if}
    </form>
</Modal>

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