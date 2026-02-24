// place files you want to import through the `$lib` alias in this folder.
//load markdown files with vite meta.glob
export const markdownFiles = async () => {
    try {
        const globFiles = import.meta.glob('./posts/*.md', { eager: true });
        //resolve all modules
        const posts = await Promise.all(
            Object.entries(globFiles).map(async ([path, resolver]) => {
                const content = await resolver as Record<string, any>;
                const metadata = content.metadata;
                const slugMatch = path.match(/posts\/(.*?)\.md$/);
                if (slugMatch && slugMatch[1]) {
                    metadata.slug = slugMatch[1];
                }
                return { path: path, metadata: metadata };
            })
        );
        return posts;
    } catch (e) {
        console.error("Error loading markdown files", (e as Error)?.message);
        throw new Error("Error loading markdown files - " + (e as Error)?.message);
    }
}
export const getPostBySlug = async (slug: string) => {
    try {
        const post = await import(`./posts/${slug}.md`);
        //find prev and next post based on the order in the markdownFiles
        const allPosts = await markdownFiles();
        const currentIndex = allPosts.findIndex(p => p.metadata.slug === slug);
        //slices the array from 0 to the current index
        // then reverse the array to find the nearest to current
        // find for the first post that is published
        const prevPost = allPosts.slice(0, currentIndex).reverse().find(p => p.metadata.published === true);
        const nextPost = allPosts.slice(currentIndex + 1).find(p => p.metadata.published === true);
        
        if (post && post.metadata?.published === true) {
            return {
                post: post.default,
                metadata: post.metadata,
                prevPost: prevPost ? { slug: prevPost.metadata.slug, title: prevPost.metadata.title } : null,
                nextPost: nextPost ? { slug: nextPost.metadata.slug, title: nextPost.metadata.title } : null
            }
        } // when draft is true, return null
        return null;
    } catch (e) {
        console.error("Post not found", { message: "Check the folder/ markdown file name - " + (e as Error)?.message });
        throw new Error("Post not found - Check the folder/markdown file name - " + (e as Error)?.message);
    }
}