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
    {#if metadata?.image}
        <Image
            src={metadata?.image}
            alt={"blogpost setup"}
            className="hero-image"
            width={"100%"}
            height={"auto"}
        ></Image>
    {/if}
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
        .heading {
            font-weight: 900;
            text-wrap: balance;
            text-align: center;
            justify-self: center;
            align-self: center;
            position: relative;
            width: fit-content;
            height: fit-content;
            max-width: 80%;
            color: var(--color-ld-accent-500);
            @media (width < 600px) {
                max-width: 100%;
                text-wrap: pretty;

            }
        }

        .metadata {
            display: flex;
            width: 100%;
            text-align: center;
            flex: 1;
            justify-content: center;
            font-size: calc(0.9rem * var(--scale));
        }
        .published {
            font-size: calc(1.1rem * var(--scale));
        }
        .author {
            margin-bottom: var(--space-8);
        }
    }

    :global(.hero-image) {
        border-radius: 1rem;
        object-fit: cover;
        margin-bottom: 1.5rem;
    }
</style>
