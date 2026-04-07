<script lang="ts">
    import { page } from "$app/state";
    import Image from "$lib/components/Image.svelte";
    
    let { data } = $props();
    let posts = $derived(data.posts);
</script>

<div class="posts-list">
    {#each posts as post}
        {#if post.metadata.published}
            <a href="{page.url.pathname}/{post.metadata.slug}" class="post-row">
                <div class="image-wrapper" style="view-transition-name: post-img-{post.metadata.slug}">
                    {#if post.metadata.image}
                        <Image
                            src={post.metadata.image}
                            alt={post.metadata.title}
                            className="post-thumbnail"
                            width="100%"
                            height="100%"
                        />
                    {:else}
                        <div class="placeholder-img"></div>
                    {/if}
                </div>
                <div class="post-content">
                    <h3 class="post-title" style="view-transition-name: post-title-{post.metadata.slug}">
                        {post.metadata.title}
                    </h3>
                    {#if post.metadata.description}
                        <p class="post-excerpt">{post.metadata.description}</p>
                    {/if}
                    <div class="post-meta">
                        <span class="date">{post.metadata.created}</span>
                        <span class="author">by {post.metadata.author}</span>
                    </div>
                </div>
            </a>
        {/if}
    {/each}
</div>

<style>
    .posts-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        padding-block: var(--space-8);
        container-type: inline-size;
    }

    .post-row {
        display: flex;
        flex-direction: row;
        border-radius: var(--radius-card);
        background-color: var(--color-ld-white-300);
        border: var(--border-default);
        overflow: hidden;
        text-decoration: none;
        color: inherit;
        transition: transform var(--transition-base) ease, box-shadow var(--transition-base) ease;
        box-shadow: var(--shadow-sm);
        height: 200px;
    }

    @container (max-width: 600px) {
        .post-row {
            flex-direction: column;
            height: auto;
        }
    }

    .post-row:hover {
        /* transform: translateY(-2px); */
        box-shadow: var(--shadow-md);
        border-color: var(--color-ld-accent-500);
    }

    .image-wrapper {
        flex: 0 0 35%;
        min-height: 200px;
        overflow: hidden;
        background-color: var(--color-ld-white-400);
    }

    @container (max-width: 600px) {
        .image-wrapper {
            flex: none;
            width: 100%;
            height: 200px;
        }
    }

    :global(.post-thumbnail) {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .placeholder-img {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--color-ld-accent-300), var(--color-ld-accent-600));
        opacity: 0.2;
    }

    .post-content {
        padding: var(--pad-card);
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
    }

    .post-title {
        margin-top: 0;
        margin-bottom: var(--space-2);
        font-size: var(--h4);
        color: var(--color-ld-accent-500);
        line-height: 1.2;
        text-wrap: balance;
    }

    .post-excerpt {
        font-size: var(--p);
        margin-bottom: var(--space-4);
        color: var(--color-ld-black-600);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .post-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.85rem;
        color: var(--color-ld-black-700);
        margin-top: auto;
    }
</style>
