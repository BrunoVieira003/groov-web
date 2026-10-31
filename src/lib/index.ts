// place files you want to import through the `$lib` alias in this folder.

import { env } from "$env/dynamic/public";

function getApiUrl(){
    // trailing slashes are stripped so every endpoint can be built as `${API_URL}/path`
    return String(env.PUBLIC_API_URL ?? "").replace(/\/+$/, "")
}

export const API_URL = getApiUrl()
