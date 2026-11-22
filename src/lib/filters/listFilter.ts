export const FILTER_PARAM = "filter"

export function filterQuery(url: URL, apiParam: "title" | "name"): string {
    const text = url.searchParams.get(FILTER_PARAM)?.trim()
    if (!text) return ""
    return `?${new URLSearchParams({ [apiParam]: text })}`
}
