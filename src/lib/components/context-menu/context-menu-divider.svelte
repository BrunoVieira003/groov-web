<script lang="ts">
    interface PropsType{
        title?: string
        noLine?: boolean
    }

    let {title, noLine = false}: PropsType = $props()
</script>

<div class="flex flex-col my-2">
    {#if !noLine}
        <hr class="text-neutral-light"/>
    {/if}
    {#if title}
        <p class="font-semibold text-legend text-sm py-2 px-4 -mb-2 w-full mx-auto">{title}</p>
    {/if}
</div>