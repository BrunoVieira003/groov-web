<script lang="ts">
    import { goto } from "$app/navigation";
    import { viewMode } from "$lib/stores/viewMode";
    import type Artist from "$lib/types/artist";

    interface Props{
        artists: {id: string, name: string}[],
        size?: 'small' | 'default' | 'big'
    }

    let {artists, size = 'default'}: Props = $props()

    async function onClickArtist(artistId: string){
        viewMode.set('default')
        goto(`/artists/${artistId}`)
    }
</script>

<div class="flex gap-1">
    {#each artists as artist}
        <button
        onclick={() => onClickArtist(artist.id)}
        class="cursor-pointer hover:underline not-last:after:content-[',']"
        class:default={size === 'default'}
        class:small={size === 'small'}
        class:big={size === 'big'}
        >
            {artist.name}
        </button>
    {/each}
</div>

<style>
    @import 'tailwindcss';
    
    .default{
        @apply text-sm;
    }

    .small{
        @apply text-xs;
    }

    .big{
        @apply text-xl;
    }
</style>