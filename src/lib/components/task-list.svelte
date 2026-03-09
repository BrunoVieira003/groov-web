<script lang="ts">
    import { runningTasks } from "$lib/stores/runningTasks";
    import { fade, slide } from "svelte/transition";
    import ProgressBar from "./progress-bar.svelte";
    import Icon from "@iconify/svelte";
</script>

<div class="flex flex-col absolute top-20 right-10 w-100 h-fit">
    {#each $runningTasks as task (task.id)}
        <div class="bg-slate-800 h-fit w-full p-4 rounded" transition:slide={{axis: 'y'}}>
            <div class="flex justify-between items-center">
                <p>{task.label}</p>
                {#if task.status === 'done'}
                    <div transition:fade>
                        <Icon icon="ic:round-check" width="24" height="24"/>
                    </div>
                {/if}
            </div>
            {#if task.status === 'running'}
                <ProgressBar min={0} max={100} bind:value={task.progress}/>
            {/if}
        </div>
    {/each}
</div>