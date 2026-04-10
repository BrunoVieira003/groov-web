<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";

    interface Props extends Omit<HTMLInputAttributes, 'type' | 'size'>{
        placeholder?: string
        size?: 'normal' | 'big'
    }

    let {value = $bindable(), placeholder, size = 'normal',  ...rest}: Props = $props()
    let filename = $derived(() => {
        if(value){
            const newValue = String(value)
            return newValue.split('\\').pop()
        }

        return ''
    })

    let fileInput: HTMLInputElement
    let button: HTMLButtonElement
</script>

<div class={rest.class}>
    <input
    type="file"
    multiple={false}
    class="hidden"
    bind:this={fileInput}
    bind:value
    {...rest}
    >

    <button
    bind:this={button}
    onclick={() => fileInput?.click()}
    type="button"
    class='bg-neutral-light hover:bg-neutral-lighter rounded-lg cursor-pointer w-full'
    class:big={size === 'big'}
    class:normal={size === 'normal'}
    class:filled={value}
    >
    {#if value && typeof value === 'string'}
        <p class="text-sm">{filename()}</p>
    {:else}
        <p class="text-md">{placeholder || 'Upload'}</p>
    {/if}
    </button>


</div>

<style>
    .big{
        padding: 2rem;
    }

    .normal{
        padding: 0.5rem;
        text-wrap: nowrap;
    }

    .filled{
        background-color: #0f172b;
    }
</style>