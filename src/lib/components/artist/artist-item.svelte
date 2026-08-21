
<script lang="ts">
    import { fallbackImage } from "$lib/plugins/fallbackImage";
    import type { ArtistSummary } from "$lib/types/artist";

    interface PropsType{
        artist: ArtistSummary
    }

    let {artist}: PropsType = $props()
</script>

<div class="flex flex-col items-center justify-between p-4 gap-6 bg-neutral-medium rounded-xl">
    <img class="rounded-full aspect-square" src="/api/media/artists/{artist.id}/cover" alt="artist_cover" {@attach fallbackImage}>
    <a class="hover:underline line-clamp-2" href="/artists/{artist.id}">{artist.name}</a>
</div>
