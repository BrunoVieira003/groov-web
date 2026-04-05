<script lang="ts">
    import { goto } from "$app/navigation";
    import { currentSong } from "$lib/stores/currentSong";
    import { viewMode } from "$lib/stores/viewMode";
    import type Artist from "$lib/types/artist";
    import Marquee from "./marquee.svelte";

    interface Props{
        artists: {id: string, name: string}[],
        size?: 'small' | 'default' | 'big'
        color?: 'default' | 'colorful' | 'contrast'
    }

    let {artists, size = 'default', color = 'default'}: Props = $props()

    async function onClickArtist(artistId: string){
        viewMode.set('default')
        goto(`/artists/${artistId}`)
    }
</script>

<Marquee>
    <div class="flex gap-1">
        {#each artists as artist}
        <button
        onclick={() => onClickArtist(artist.id)}
        class="cursor-pointer hover:underline not-last:after:content-[',']"
        class:default={size === 'default'}
        class:small={size === 'small'}
        class:big={size === 'big'}
        class:colorful={color === 'colorful'}
        class:contrast={color === 'contrast'}
        style:--colorful={$currentSong?.color ?? ''}
        style:--contrast={$currentSong?.contrastColor ?? ''}
        >
            {artist.name}
        </button>
        {/each}
    </div>
</Marquee>

<style>
    .default{
        font-size: 0.875rem;
    }

    .small{
        font-size: 0.75rem;
    }

    .big{
        font-size: 1.25rem;
    }

    .colorful{
       color: var(--colorful); 
    }

    .contrast{
       color: var(--contrast); 
    }
</style>