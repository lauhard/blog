<script lang="ts">
    import { page } from "$app/state";
    let { data } = $props();
    let posts = $derived(data.posts);
</script>

<ul>
    {#each posts as post}
        {#if post.metadata.published}
            <li>
                <a href="{page.url.pathname}/{post.metadata.slug}"
                    >{post.metadata.title}</a
                >
            </li>
        {/if}
    {/each}
</ul>
