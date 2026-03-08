<script lang="ts">
    import { toggleViewMode, viewMode } from "$lib/stores/viewMode";
    import Icon from "@iconify/svelte";

</script>
<button onclick={toggleViewMode} title="Enter full view mode" class="flex gap-2 items-center w-fit cursor-pointer group">
    <Icon icon="ri:disc-fill" width="24" height="24" />
    {#if $viewMode === 'default'}
        <p class="text-sm hidden group-hover:block">Enter full view mode</p>
    {/if}
    {#if $viewMode === 'full'}
        <p class="text-sm hidden group-hover:block">Exit full view mode</p>
    {/if}
</button>