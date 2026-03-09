<script lang="ts">
    interface Props{
        max: number
        min: number
        value: number
        interactive?: boolean
    }

    
    let {min, max, value = $bindable(min), interactive = false}: Props = $props()

    let progress = $derived(() => {
        return Math.floor((value / max) * 100);
    });
</script>

<div class="slider w-full h-fit">
    {#if interactive}  
        <input
        bind:value={value}
        min={min}
        max={max}
        class="range-slider bg-gray-500"
        type="range"
        step="0.01"
        />
    {/if}
    
    <div
    class="progress bg-gray-200 transition-all duration-50"
    style="width: {progress()}%;"
    >
    </div>

    <div
    class="slider-thumb bg-gray-200"
    style="left: calc({progress()}% - 0.5rem);"
    >
    </div>

</div>