<script lang="ts">
    import { env } from "$env/dynamic/public";
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

    let isScrollFree = $state(false)

    let currentLine = $derived(
        syncedLyrics.findIndex((line) => line.time >= $currentTime) - 1,
    );

    let syncedElements = $state<HTMLElement[]>([]);

    $effect(() => {
        const element = syncedElements[currentLine];
        if (element && !isScrollFree) {
            element.scrollIntoView({ block: "center", behavior: "smooth" });
        }
    });

    $effect(() => {
        const song = $currentSong;
        if (!song?.id) {
            unsyncedLyrics = [];
            syncedLyrics = [];
            return;
        }

        (async () => {
            try {
                const response = await fetch(
                    `/api/media/songs/${$currentSong?.id}/lyrics`,
                );
                console.log(response.ok);
                if (!response.ok) {
                    unsyncedLyrics = [];
                    syncedLyrics = [];
                    hasLyrics = false;
                    return;
                }

                const data: LyricResponse =
                    (await response.json()) satisfies LyricResponse;

                synced = data.synced;
                if (data.synced) {
                    syncedLyrics = data.lyrics;
                } else {
                    unsyncedLyrics = data.lyrics;
                }

                hasLyrics = true;
            } catch (e) {
                unsyncedLyrics = [];
                syncedLyrics = [];
                hasLyrics = false;
            }
        })();
    });
</script>

{#if hasLyrics}
    {#if synced}
        {#if isScrollFree}
            <button onclick={() => isScrollFree = false} class="sticky top-11/12 left-1/2 -translate-x-1/2 bg-surface text-highlight border border-border shadow shadow-shadow px-4 py-2 rounded-full font-bold cursor-pointer text-xl">Sync</button>
        {/if}
        <div
            onwheel={() => {isScrollFree = true}}
            class="flex flex-col items-center gap-2"
            style="--colorful: {$currentSong?.color}"
        >
            {#each syncedLyrics as lyric, line}
                <button
                    bind:this={syncedElements[line]}
                    class="w-fit text-2xl text-legend transition-all cursor-pointer"
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
        font-size: 2.2rem;
    }
</style>
