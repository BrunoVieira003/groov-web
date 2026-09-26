import { page } from "$app/state"
import type { Attachment } from "svelte/attachments"

export const activeLink: Attachment<HTMLAnchorElement> = (element) => {
    console.log(element.href, page.url.href, element.href === page.url.href)
    element.ariaCurrent= page.url.pathname === element.href ? 'page' : null
    if(element.href === page.url.href){
        element.classList.add('active-link')
    }else{
        element.classList.remove('active-link')
    }
}