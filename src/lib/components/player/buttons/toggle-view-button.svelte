<script lang="ts">
    import { toggleViewMode, viewMode } from "$lib/stores/viewMode";
    import fullModeIcon from "$lib/assets/icons/full-mode.svg?raw"

</script>
<button onclick={toggleViewMode} title="Change view mode" class="w-fit cursor-pointer">
    {@html fullModeIcon}
</button>