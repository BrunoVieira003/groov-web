<script lang="ts">
    import { API_URL } from "$lib";
    import { currentSong, currentTime } from "$lib/stores/player";

    type UnsyncedLyrics = string[];
    type SyncedLyrics = { time: number; text: string }[];

    type LyricResponse =
        | { synced: false; lyrics: UnsyncedLyrics }
        | { synced: true; lyrics: SyncedLyrics };

    let unsyncedLyrics = $state<UnsyncedLyrics>([]);
    let syncedLyrics = $state<SyncedLyrics>([]);
    let synced = $state<boolean>(false);
    let hasLyrics = $state(false);
    let loading = $state(false);

    let isScrollFree = $state(false)

    // last line that already started; -1 before the first line
    let currentLine = $derived(
        syncedLyrics.findLastIndex((line) => line.time <= $currentTime),
    );

    // a primitive, so re-setting the same song (e.g. repeat-one) does not refetch the lyrics
    let songId = $derived($currentSong?.id);

    function resetLyrics() {
        unsyncedLyrics = [];
        syncedLyrics = [];
        synced = false;
        hasLyrics = false;
    }

    let syncedElements = $state<HTMLElement[]>([]);

    $effect(() => {
        const element = syncedElements[currentLine];
        if (element && !isScrollFree) {
            element.scrollIntoView({ block: "center", behavior: "smooth" });
        }
    });

    $effect(() => {
        const id = songId;
        resetLyrics();

        if (!id) {
            loading = false;
            return;
        }

        // aborted when the song changes (or the page unmounts), so a slow
        // response from the previous song can never overwrite the current one
        const controller = new AbortController();
        loading = true;

        (async () => {
            try {
                const response = await fetch(`${API_URL}/songs/${id}/lyrics`, {
                    signal: controller.signal,
                });
                if (!response.ok) return;

                const data: LyricResponse =
                    (await response.json()) satisfies LyricResponse;
                if (controller.signal.aborted) return;

                synced = data.synced;
                if (data.synced) {
                    syncedLyrics = data.lyrics;
                } else {
                    unsyncedLyrics = data.lyrics;
                }

                hasLyrics = true;
            } catch (e) {
                if (controller.signal.aborted) return;
                resetLyrics();
            } finally {
                if (!controller.signal.aborted) loading = false;
            }
        })();

        return () => controller.abort();
    });
</script>

{#if loading}
    <!-- avoid flashing "No lyrics" while the request is in flight -->
{:else if hasLyrics}
    {#if synced}
        {#if isScrollFree}
            <button onclick={() => isScrollFree = false} class="sticky top-11/12 left-1/2 -translate-x-1/2 bg-surface text-highlight border border-border shadow shadow-shadow px-4 py-2 rounded-full font-bold cursor-pointer text-xl">Sync</button>
        {/if}
        <div
            onwheel={() => {isScrollFree = true}}
            class="flex flex-col items-center gap-8"
            style="--colorful: {$currentSong?.colors.vibrant}"
        >
            {#each syncedLyrics as lyric, line}
                <button
                    bind:this={syncedElements[line]}
                    class="w-fit text-4xl text-legend transition-all cursor-pointer"
                    class:active={currentLine === line}
                    class:neighbor={currentLine === line+1 || currentLine === line-1}
                    onclick={() => {currentTime.set(lyric.time); isScrollFree = false}}
                >
                    {lyric.text}
                </button>
            {/each}
        </div>
    {:else}
        {#each unsyncedLyrics as lyric}
            <p class="text-center text-2xl text-subheading">{lyric}</p>
        {/each}
    {/if}
{:else}
    <div class="flex items-center justify-center size-full">
        <h2 class="text-5xl text-heading">No lyrics for this song</h2>
    </div>
{/if}

<style>
    .active {
        color: var(--colorful);
        font-size: 3rem;
    }
</style>
