<script lang="ts">
    interface Props{
        artists: {id: string, name: string}[],
        size?: 'small' | 'default'
    }

    let {artists, size = 'default'}: Props = $props()
</script>

<div class="flex gap-1">
    {#each artists as artist}
        <a
        href="/artists/{artist.id}"
        class="hover:underline not-last:after:content-[',']"
        class:default={size === 'default'}
        class:small={size === 'small'}
        >
            {artist.name}
        </a>
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
</style>