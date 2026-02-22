<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import type { PageProps } from "./$types";
    import toast from "svelte-hot-french-toast";

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
        <div class="flex flex-col">
            <label for="file" class="text-xl">Song file</label>
            <input type="file" name="file" id="file" accept=".mp3">
        </div>
        <input type="submit" value="Upload" class="cursor-pointer bg-gray-200 p-2 rounded-lg text-slate-800">
    </form>
</div>