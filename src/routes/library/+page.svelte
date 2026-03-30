<script lang="ts">
    import { enhance } from "$app/forms";
    import UploadButton from "$lib/components/forms/upload-button.svelte";
    import { trackTask } from "$lib/stores/runningTasks";
    import type { SubmitFunction } from "@sveltejs/kit";
    import toast from "svelte-hot-french-toast";

    const handleUpload: SubmitFunction = () => {
        return async ({result, update}) => {
            await update()
            if(result.type === 'success'){
                if(result.data){
                    trackTask('upload', result.data.taskId, 'Upload')
                }
                toast.success('File uploaded')
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
                    trackTask('scan-folder', result.data.taskId, 'Scan folder')
                }
                toast.success('Scan initialized')
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
                    trackTask('prune-songs', result.data.taskId, 'Prune songs')
                }
                toast.success('Prune initialized')
            }else{
                toast.error('Prune failed')
            }
        }
    }
</script>

<h1 class="page-title w-full text-center sm:text-start sm:w-11/12 md:w-8/12 sm:mx-auto">Library</h1>
<div class="flex flex-col gap-4 w-full sm:w-11/12 md:w-8/12 sm:mx-auto bg-slate-800 p-4 rounded-lg">
    
    <div class="flex flex-wrap gap-2 items-center justify-between">
        <div>
            <p class="font-semibold">Scan folder</p>
            <p class="text-sm opacity-80 w-full">Scans your music directory and update database with new files or tags</p>
        </div>
        <form method="post" action="?/scan" class="flex gap-4" use:enhance={handleScan}>
            <input type="submit" value="Execute" class="cursor-pointer bg-gray-200 p-2 w-full rounded-lg text-slate-800">
        </form>
    </div>
    
    <div class="flex flex-wrap gap-2 items-center justify-between">
        <div>
            <p class="font-semibold">Upload new song</p>
            <p class="text-sm opacity-80 w-full">Upload a new file manually to be saved in your music directory</p>
        </div>
        <form method="post" action="?/upload" class="flex gap-4 items-center" enctype="multipart/form-data" use:enhance={handleUpload}>
            <UploadButton name='file' id='file' accept='.mp3' placeholder='Choose audio file'/>
            <input type="submit" value="Execute" class="cursor-pointer bg-gray-200 p-2 w-full rounded-lg text-slate-800">
        </form>
    </div>

    <div class="flex flex-wrap gap-2 items-center justify-between">
        <div>
            <p class="font-semibold">Prune songs</p>
            <p class="text-sm opacity-80 w-4/7 line-clamp-3">Verify the database for songs with no file associated. This is useful when you delete a file, but the app still has the song on the database</p>
        </div>
        <form method="post" action="?/pruneSongs" class="flex gap-4" use:enhance={handlePruneSongs}>
            <input type="submit" value="Execute" class="cursor-pointer bg-gray-200 p-2 w-full rounded-lg text-slate-800">
        </form>
    </div>

</div>