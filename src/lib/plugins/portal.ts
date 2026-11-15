import type { Attachment } from "svelte/attachments";

/**
 * Moves the element to the end of <body>, so overlays (modals) escape
 * any ancestor that clips them or creates a stacking context
 * (overflow containers, transforms, z-index).
 */
export const portal: Attachment<HTMLElement> = (element) => {
    document.body.appendChild(element)

    return () => element.remove()
}
