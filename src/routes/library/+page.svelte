<script lang="ts">
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import { PUBLIC_API_URL } from "$env/static/public";
    import UploadButton from "$lib/components/forms/upload-button.svelte";
    import { trackTask } from "$lib/stores/runningTasks";
    import type { SubmitFunction } from "@sveltejs/kit";
    import toast from "svelte-hot-french-toast";

    const handleUpload: SubmitFunction = () => {
        return async ({result, update}) => {
            await update()
            if(result.type === 'success'){
                if(result.data){
                    trackTask(result.data.taskId, 'Upload')
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
                    trackTask(result.data.taskId, 'Scan folder')
                }
                toast.success('Scan initialized')
            }else{
                toast.error('Scan failed')
            }
        }
    }
</script>

<h1 class="page-title w-8/12 mx-auto">Library</h1>
<div class="flex flex-col gap-4 w-8/12 mx-auto bg-slate-800 p-4 rounded-lg">
    
    <div class="flex items-center justify-between">
        <p>Scan folder</p>
        <form method="post" action="?/scan" class="flex gap-4" use:enhance={handleScan}>
            <input type="submit" value="Scan" class="cursor-pointer bg-gray-200 p-2 w-full rounded-lg text-slate-800">
        </form>
    </div>

    <div class="flex items-center justify-between">
        <p>Upload new song</p>
        <form method="post" action="?/upload" class="flex gap-4 items-center" enctype="multipart/form-data" use:enhance={handleUpload}>
            <UploadButton name='file' id='file' accept='.mp3' placeholder='Choose audio file'/>
            <input type="submit" value="Upload" class="cursor-pointer bg-gray-200 p-2 w-full rounded-lg text-slate-800">
        </form>
    </div>

</div>