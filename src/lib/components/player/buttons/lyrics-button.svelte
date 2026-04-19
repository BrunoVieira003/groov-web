<script lang="ts">
    import { goto } from '$app/navigation';
    import lyricsIcon from '$lib/assets/icons/lyrics.svg?raw'
    import { viewMode } from '$lib/stores/viewMode';

    function gotoLyrics(){
        viewMode.set('default')
        goto('/lyrics')
    }
</script>

<button class="cursor-pointer" onclick={gotoLyrics}>{@html lyricsIcon}</button>