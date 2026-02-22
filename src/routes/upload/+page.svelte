<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import type { PageProps } from "./$types";
    import toast from "svelte-hot-french-toast";
    import UploadButton from "$lib/components/forms/upload-button.svelte";

    const handleSubmit: SubmitFunction = () => {
        return async ({result, update}) => {
            await update()
            if(result.type === 'success'){
                toast.success('File uploaded')
            }
        }
    }

    const { form }: PageProps = $props()

</script>

<div class="w-fit mx-auto">
    <h1 class="page-title">Upload new song</h1>
    <form method="post" class="space-y-6" enctype="multipart/form-data" use:enhance={handleSubmit}>
        <div class="flex flex-col gap-4 w-full">
            <label for="file" class="text-xl">Song file</label>
            <UploadButton name='file' id='file' accept='.mp3' placeholder='Choose audio file' size='big'/>
        </div>
        <input type="submit" value="Upload" class="cursor-pointer bg-gray-200 p-2 w-full rounded-lg text-slate-800">
    </form>
</div>