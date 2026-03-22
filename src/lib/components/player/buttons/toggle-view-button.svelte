<script lang="ts">
    import { toggleViewMode, viewMode } from "$lib/stores/viewMode";
    import Icon from "@iconify/svelte";

</script>
<button onclick={toggleViewMode} title="Change view mode" class="flex flex-col gap-2 items-center w-fit cursor-pointer group">
    <Icon icon="ri:disc-fill" width="24" height="24" />
</button>