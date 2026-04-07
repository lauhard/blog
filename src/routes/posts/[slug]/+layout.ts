import { getPostBySlug, markdownFiles } from "$lib";
import { error } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ params }) => {
    try {
        const slug = params.slug;

        const blogContent = await getPostBySlug(slug)
        if (!blogContent) {
            throw new Error("Post not found or is a draft");
        }
        const posts = await markdownFiles();
        return {
            ...blogContent,
            posts
        }
    } catch (e) {
        error(404, { message: (e as Error)?.message } as App.Error);
    }
}