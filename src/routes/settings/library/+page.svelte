<script lang="ts">
    import { enhance } from "$app/forms";
    import UploadButton from "$lib/components/forms/upload-button.svelte";
    import activeTab from "$lib/stores/activeTab";
    import { trackTask } from "$lib/stores/runningTasks";
    import type { SubmitFunction } from "@sveltejs/kit";
    import toast from "svelte-hot-french-toast";

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

<h2 class="page-title w-full text-subheading">Library</h2>
    
<div class="flex not-sm:flex-col gap-2 items-stretch justify-between">
    <div>
        <p class="font-semibold text-heading">Scan folder</p>
        <p class="text-sm text-subheading w-full">Scans your music directory and update database with new files or tags</p>
    </div>
    <form method="post" action="?/scan" class="flex gap-4" use:enhance={handleScan}>
        <input type="submit" value="Execute" class="cursor-pointer bg-surface hover:bg-surface-hover p-2 w-full rounded-lg text-heading">
    </form>
</div>

<div class="flex not-sm:flex-col gap-2 items-stretch justify-between">
    <div>
        <p class="font-semibold text-heading">Upload new song</p>
        <p class="text-sm text-subheading w-full">Upload a new file manually to be saved in your music directory</p>
    </div>
    <form method="post" action="?/upload" class="flex gap-4 not-sm:flex-col not-sm:items-stretch items-center" enctype="multipart/form-data" use:enhance={handleUpload}>
        <UploadButton name='file' id='file' accept='.mp3' placeholder='Choose audio file'/>
        <input type="submit" value="Execute" class="cursor-pointer p-2 w-full rounded-lg bg-surface hover:bg-surface-hover text-heading">
    </form>
</div>

<div class="flex not-sm:flex-col gap-2 items-stretch justify-between">
    <div>
        <p class="font-semibold text-heading">Prune songs</p>
        <p class="text-sm text-subheading line-clamp-3">Verify the database for songs with no file associated. This is useful when you delete a file, but the app still has the song on the database</p>
    </div>
    <form method="post" action="?/pruneSongs" class="flex items-center gap-4" use:enhance={handlePruneSongs}>
        <input type="submit" value="Execute" class="cursor-pointer bg-surface hover:bg-surface-hover p-2 w-full rounded-lg text-heading">
    </form>
</div>

<div class="flex not-sm:flex-col gap-2 items-stretch justify-between">
    <div>
        <p class="font-semibold text-heading">Prune artists</p>
        <p class="text-sm text-subheading line-clamp-3">Verify the database for artists with no song associated.</p>
    </div>
    <form method="post" action="?/pruneArtists" class="flex items-center gap-4" use:enhance={handlePruneArtists}>
        <input type="submit" value="Execute" class="cursor-pointer bg-surface hover:bg-surface-hover p-2 w-full rounded-lg text-heading">
    </form>
</div>

<div class="flex not-sm:flex-col gap-2 items-stretch justify-between">
    <div>
        <p class="font-semibold text-heading">Prune albums</p>
        <p class="text-sm text-subheading line-clamp-3">Verify the database for albums with no song associated.</p>
    </div>
    <form method="post" action="?/pruneAlbums" class="flex items-center gap-4" use:enhance={handlePruneAlbums}>
        <input type="submit" value="Execute" class="cursor-pointer bg-surface hover:bg-surface-hover p-2 w-full rounded-lg text-heading">
    </form>
</div>

<div class="flex not-sm:flex-col gap-2 items-stretch justify-between">
    <div>
        <p class="font-semibold text-heading">Prune assets</p>
        <p class="text-sm text-subheading line-clamp-3">Remove unused images for songs and albums</p>
    </div>
    <form method="post" action="?/pruneAssets" class="flex items-center gap-4" use:enhance={handlePruneAssets}>
        <input type="submit" value="Execute" class="cursor-pointer bg-surface hover:bg-surface-hover p-2 w-full rounded-lg text-heading">
    </form>
</div>