<script lang="ts">
    import { page } from "$app/state";
    import Image from "$lib/components/Image.svelte";
    let { data } = $props();
    let metadata = $derived(data?.metadata);
    let categories = $derived(metadata?.categories);
    let headings: NodeListOf<HTMLHeadingElement> | undefined = $state();
    $effect(() => {
        headings = document.querySelectorAll(" h2, h3, h4, h5, h6");
    });
    let post = $derived(data?.post);
    let episode = $state(-1);
</script>

<div class="blog-metadata">
    <h2 class="heading">
        {metadata.title}
    </h2>
    <span class="metadata published" style="">
        published {metadata.created}
    </span>
    <span class="metadata author">
        by {metadata.author}
    </span>
    <!-- <div class="stats">
        <div class="freshness"></div>
        <div class="reading-time"></div>
    </div> -->
</div>

<div class="hero">
    {#if metadata?.image}
        <Image
            src={metadata?.image}
            alt={"blogpost setup"}
            className="hero-image"
            width={"100%"}
            height={"auto"}
        ></Image>
    {/if}
    <div class="excerpt">{metadata.excerpt}</div>
</div>

{#if headings}
    <!-- Toc -->
{/if}

<div class="blog-post">
    {@render post()}
</div>

<style lang="scss">
    .blog-metadata {
        margin-top: 2rem;
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        position: relative;
        margin-bottom: 5rem;
        .heading {
            font-weight: 900;
            text-wrap: pretty;
            text-align: center;
            justify-self: center;
            align-self: center;
            position: relative;
            width: fit-content;
            height: fit-content;
            max-width: 80%;
            color:var(--color-ld-accent-500);
        }

        .metadata {
            font-size: calc(1rem * var(--scale));
            font-weight: 500;
            display: flex;
            width: 100%;
            text-align: center;
            flex: 1;
            justify-content: center;
        }
    }

    .hero {
        border-radius: 1rem;
        .excerpt {
            display: flex;
            justify-self: center;
            height: max-content;
            max-width: 90%;
            margin-bottom: 5rem;
            padding: 0.5rem 1rem;
            // padding-left: 2rem;
            font-size: var(--p);
            line-height: calc(1.6rem * var(--scale));
            font-style: italic;
            font-weight: 500;
            &::before {
                content: "";
                margin-right: 2rem;
                min-width: 5px;
                max-width: 5px;
                width: 5px;
                display: block;
                background-color: var(--color-ld-accent-500);
                border-radius: 25px;
                margin-bottom: 1rem;
                margin-top: 1rem;
            }
        }
    }
   

    :global(.hero-image) {
        border-radius: 1rem;
        object-fit: cover;
        margin-bottom: 1.5rem;
    }
</style>
