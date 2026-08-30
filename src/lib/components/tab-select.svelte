<script lang="ts" generics="ItemValue">
    import type { getContext, Snippet } from "svelte";

    interface Props{
        options: {label: string, value: ItemValue}[],
        value: ItemValue
    }

    let { options, value = $bindable() }: Props = $props()
</script>

<div class="flex justify-stretch flex-wrap w-full border-2 border-border rounded-md">
    {#each options as option}
        <button
        class="flex-1 p-2 first:rounded-l-sm last:rounded-r-sm text-subheading data-[active=true]:bg-bg-active data-[active=true]:text-heading hover:bg-bg-hover hover:cursor-pointer"
        data-active={value === option.value}
        onclick={() => value = option.value}
        >
            {option.label}
        </button>
    {/each}
</div>