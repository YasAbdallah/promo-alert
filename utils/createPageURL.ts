export function createPageURL(page: number, searchParams: URLSearchParams): string {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `?${params.toString()}`;
}