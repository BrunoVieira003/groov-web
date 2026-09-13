<script lang="ts">
    import { enhance } from "$app/forms";
    import UploadButton from "$lib/components/forms/upload-button.svelte";
    import activeTab from "$lib/stores/activeTab";
    import { trackTask } from "$lib/stores/runningTasks";
    import type { SubmitFunction } from "@sveltejs/kit";
    import toast from "svelte-hot-french-toast";
    import searchIcon from '$lib/assets/icons/search.svg?raw'
    import uploadIcon from '$lib/assets/icons/upload.svg?raw'
    import pruneSongIcon from '$lib/assets/icons/cut-song.svg?raw'
    import pruneArtistIcon from '$lib/assets/icons/cut-artist.svg?raw'
    import pruneAlbumIcon from '$lib/assets/icons/cut-album.svg?raw'
    import pruneAssetIcon from '$lib/assets/icons/cut-asset.svg?raw'

    activeTab.set('library')

    const handleUpload: SubmitFunction = () => {
        return async ({result, update}) => {
            await update()
            if(result.type === 'success'){
                if(result.data){
                    toast.success('File uploaded')
                }
            }else{
                toast.error('Upload failed')
            }
        }
    }

    const handleScan: SubmitFunction = () => {
        return async ({result, update}) => {
            await update()
            if(result.type === 'success'){
                if(result.data){
                    toast.success('Scan folder task initialized')
                }
            }else{
                toast.error('Scan failed')
            }
        }
    }

    const handlePruneSongs: SubmitFunction = () => {
        return async ({result, update}) => {
            await update()
            if(result.type === 'success'){
                if(result.data){
                    toast.success('Prune songs task initialized')
                }
            }else{
                toast.error('Prune failed')
            }
        }
    }

    const handlePruneArtists: SubmitFunction = () => {
        return async ({result, update}) => {
            await update()
            if(result.type === 'success'){
                if(result.data){
                    toast.success('Prune artists task initialized')
                }
            }else{
                toast.error('Prune failed')
            }
        }
    }

    const handlePruneAlbums: SubmitFunction = () => {
        return async ({result, update}) => {
            await update()
            if(result.type === 'success'){
                if(result.data){
                    toast.success('Prune albums task initialized')
                }
            }else{
                toast.error('Prune failed')
            }
        }
    }

    const handlePruneAssets: SubmitFunction = () => {
        return async ({result, update}) => {
            await update()
            if(result.type === 'success'){
                if(result.data){
                    toast.success('Prune assets task initialized')
                }
            }else{
                toast.error('Prune failed')
            }
        }
    }
</script>

<h2 class="w-full text-3xl text-heading mb-0">Library</h2>
<p class="text-legend mb-6">Manage your files and database</p>
    
<section class="space-y-2 mb-8">
    <div class="flex not-sm:flex-col gap-4 items-stretch justify-between bg-surface p-4 rounded-md">
        <div class="flex items-center gap-4">
            <i class="text-subheading p-2 border border-border rounded-lg size-10">{@html searchIcon}</i>
            <div>
                <p class="font-semibold text-heading">Scan folder</p>
                <p class="text-sm text-legend w-full">Scans your music directory and update database with new files or tags</p>
            </div>
        </div>
        <form method="post" action="?/scan" class="flex gap-4" use:enhance={handleScan}>
            <input type="submit" value="Execute" class="cursor-pointer bg-surface hover:bg-surface-hover p-2 w-full rounded-lg text-heading border border-border">
        </form>
    </div>
    
    <div class="flex not-sm:flex-col gap-2 items-stretch justify-between bg-surface p-4 rounded-md">
        <div class="flex items-center gap-4">
            <i class="text-subheading p-2 border border-border rounded-lg size-10">{@html uploadIcon}</i>
            <div>
                <p class="font-semibold text-heading">Upload new song</p>
                <p class="text-sm text-legend w-full">Upload a new file to be saved in your music directory</p>
            </div>
        </div>
        <form method="post" action="?/upload" class="flex gap-4 not-sm:flex-col not-sm:items-stretch items-center" enctype="multipart/form-data" use:enhance={handleUpload}>
            <UploadButton name='file' id='file' accept='.mp3' placeholder='Choose audio file'/>
            <input type="submit" value="Execute" class="cursor-pointer p-2 w-full rounded-lg bg-surface hover:bg-surface-hover text-heading border border-border">
        </form>
    </div>
</section>

<section class="space-y-4">
    <h2 class="text-subheading text-xl">Maintance</h2>
    <div class="*:p-4 *:border *:border-t-0 *:border-border *:first:border-t *:first:rounded-t-md *:last:rounded-b-md *:bg-surface">
        <div class="flex not-sm:flex-col gap-2 items-stretch justify-between">
            <div class="flex items-center gap-4">
                <i class="text-subheading p-2 border border-border rounded-lg size-10">{@html pruneSongIcon}</i>
                <div>
                    <p class="font-semibold text-heading">Prune songs</p>
                    <p class="text-sm text-legend line-clamp-3">Verify the database for songs with no file associated. This is useful when you delete a file, but the app still has the song on the database</p>
                </div>
            </div>
            <form method="post" action="?/pruneSongs" class="flex items-center gap-4" use:enhance={handlePruneSongs}>
                <input type="submit" value="Execute" class="cursor-pointer bg-surface hover:bg-surface-hover p-2 w-full rounded-lg text-heading border border-border">
            </form>
        </div>
        
        <div class="flex not-sm:flex-col gap-2 items-stretch justify-between">
            <div class="flex items-center gap-4">
                <i class="text-subheading p-2 border border-border rounded-lg size-10">{@html pruneArtistIcon}</i>
                <div>
                    <p class="font-semibold text-heading">Prune artists</p>
                    <p class="text-sm text-legend line-clamp-3">Verify the database for artists with no song associated.</p>
                </div>
            </div>
            <form method="post" action="?/pruneArtists" class="flex items-center gap-4" use:enhance={handlePruneArtists}>
                <input type="submit" value="Execute" class="cursor-pointer bg-surface hover:bg-surface-hover p-2 w-full rounded-lg text-heading border border-border">
            </form>
        </div>
        
        <div class="flex not-sm:flex-col gap-2 items-stretch justify-between">
            <div class="flex items-center gap-4">
                <i class="text-subheading p-2 border border-border rounded-lg size-10">{@html pruneAlbumIcon}</i>
                <div>
                    <p class="font-semibold text-heading">Prune albums</p>
                    <p class="text-sm text-legend line-clamp-3">Verify the database for albums with no song associated.</p>
                </div>
            </div>
            <form method="post" action="?/pruneAlbums" class="flex items-center gap-4" use:enhance={handlePruneAlbums}>
                <input type="submit" value="Execute" class="cursor-pointer bg-surface hover:bg-surface-hover p-2 w-full rounded-lg text-heading border border-border">
            </form>
        </div>
        
        <div class="flex not-sm:flex-col gap-2 items-stretch justify-between">
            <div class="flex items-center gap-4">
                <i class="text-subheading p-2 border border-border rounded-lg size-10">{@html pruneAssetIcon}</i>
                <div>
                    <p class="font-semibold text-heading">Prune assets</p>
                    <p class="text-sm text-legend line-clamp-3">Remove unused images for songs and albums</p>
                </div>
            </div>
            <form method="post" action="?/pruneAssets" class="flex items-center gap-4" use:enhance={handlePruneAssets}>
                <input type="submit" value="Execute" class="cursor-pointer bg-surface hover:bg-surface-hover p-2 w-full rounded-lg text-heading border border-border">
            </form>
        </div>
    </div>
</section>