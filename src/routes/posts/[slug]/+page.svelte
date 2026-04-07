<script lang="ts">
    import { page } from "$app/state";
    import Image from "$lib/components/Image.svelte";
    import BlogSlider from "$lib/components/BlogSlider.svelte";
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
    <h2 class="heading" style="view-transition-name: post-title-{metadata.slug}">
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
            style="view-transition-name: post-img-{metadata.slug}"
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

<BlogSlider posts={data?.posts ?? []} currentSlug={metadata?.slug} />

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

    @supports (animation-timeline: view()) {
        :global(.hero-image) {
            animation: hero-img linear both;
            animation-timeline: view(var(--header-height) 0px);
        }

        @keyframes hero-img {
            entry 0%  { opacity: 0; transform: scale(0.97); filter: blur(8px); }
            entry 20% { opacity: 1; transform: scale(1);    filter: blur(0);   }
            exit 50%  { opacity: 1; transform: scale(1);    filter: blur(0);   }
            exit 100% { opacity: 0; transform: scale(0.97); filter: blur(8px); }
        }
    }



    /* Scroll Timeline Animation for Text & Images in the blog post */
    @supports (animation-timeline: view()) {
        :global(.blog-post p),
        :global(.blog-post h2),
        :global(.blog-post h3),
        :global(.blog-post h4),
        :global(.blog-post ul) {
            animation: text-dissolve linear both;
            animation-timeline: view(var(--header-height) 0px);
        }

        @keyframes text-dissolve {
            entry 0% {
                opacity: 0;
                transform: translateY(30px) scale(.8);
                filter: blur(30px);
            }
            entry 50% {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0px);
            }
            exit 0% {
                opacity: 1;
                filter: blur(0px);
                transform: translateY(0) scale(1);
            }
            exit 80% {
                opacity: .9;
                filter: blur(0px);
                transform: translateY(0) scale(.95);
            }
            exit 100% {
                opacity: 0;
                filter: blur(30px);
                transform: translateY(-30px) scale(.8);
            }
        }

        :global(.blog-post img:not(.hero-image)) {
            animation: image-fade linear both;
            animation-timeline: view(var(--header-height) 0px);
        }

        @keyframes image-fade {
            entry 0% {
                opacity: 0;
                transform: scale(0.85);
            }
            entry 60% {
                opacity: 1;
                transform: scale(1);
            }
            exit 0% {
                opacity: 1;
                transform: scale(1);
            }
            exit 100% {
                opacity: 0;
                transform: scale(0.85);
            }
        }
    }
</style>
