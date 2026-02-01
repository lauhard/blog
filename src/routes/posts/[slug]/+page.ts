import { getPostBySlug } from "$lib";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
    try {
        const slug = params.slug;

        const blogContent = await getPostBySlug(slug)
        return {
            ...blogContent
        }
    } catch (e) {
        error(404, { message: (e as Error)?.message } as App.Error);
    }
}