<script lang='ts'>
    import { PUBLIC_API_URL } from '$env/static/public';
    import playIcon from '$lib/assets/icons/play.svg'
    import {toast} from 'svelte-hot-french-toast';

    async function executeTask(){
        const response = await fetch(`${PUBLIC_API_URL}/tasks/scan-folder`, {method: 'POST'})
        
        toast.success('Task initiated')
    }
</script>

<h1 class="page-title">Tasks</h1>
<div class="flex justify-between items-center w-1/2 mx-auto bg-gray-800 rounded p-4">
    <p class="text-xl text-nowrap">Scan folder</p>
    <button class="cursor-pointer" onclick={executeTask}>
        <img src={playIcon} alt="play_icon" class="size-6">
    </button>
</div>