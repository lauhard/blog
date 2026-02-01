import { markdownFiles } from "$lib";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const files = await markdownFiles();
    return { posts: files };
}