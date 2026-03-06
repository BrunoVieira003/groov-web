import type ContextMenu from "$lib/components/context-menu.svelte"
import { writable } from "svelte/store"

const currentContextMenu = writable<{
	hide: () => void
} | null>(null)

export default currentContextMenu