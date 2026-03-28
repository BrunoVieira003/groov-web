<script lang="ts">
    import { toggleViewMode, viewMode } from "$lib/stores/viewMode";
    import fullModeIcon from "$lib/assets/icons/full-mode.svg?raw"

</script>
<button onclick={toggleViewMode} title="Change view mode" class="flex flex-col gap-2 items-center w-fit cursor-pointer group">
    {@html fullModeIcon}
</button>