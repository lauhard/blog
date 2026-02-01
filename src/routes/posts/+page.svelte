<script lang="ts">
    import { page } from '$app/state';
    let { data } =$props()
    let posts = $derived(data.posts);
</script>

{#each posts as post}
    <li>
        <a href="{page.url.pathname}/{post.metadata.slug}">{post.metadata.title}</a>
    </li>
{/each}


