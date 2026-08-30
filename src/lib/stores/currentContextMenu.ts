import { writable } from "svelte/store"

const currentContextMenu = writable<{
	hide: () => void
} | null>(null)

export default currentContextMenu