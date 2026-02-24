<script lang="ts">
    import Image from "$lib/components/Image.svelte";
    let { data } = $props();
    let metadata = $derived(data?.metadata);
    let categories = $derived(metadata?.categories);
    let headings: NodeListOf<HTMLHeadingElement> | undefined = $state();
    $effect(() => {
        headings = document.querySelectorAll(" h2, h3, h4, h5, h6");
    });
    let post = $derived(data?.post);
</script>

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
    <div class="metadata">
        <h2 class="heading">{metadata.title}</h2>
        <p class="excerpt">{metadata.excerpt}</p>
        <p>
            <span class="descr">Published</span>
            <span class="value">{metadata.created}</span>
        </p>
        {#if metadata.author}
            <p>
                <span class="descr">Author</span>
                <span class="value">{metadata.author}</span>
            </p>
        {/if}
        {#if metadata?.updated}
            <p>
                <span class="descr">Updated</span>
                <span class="value">{metadata?.updated}</span>
            </p>
        {/if}
        {#if metadata.readingTime}
            <p>
                <span class="descr">Reading</span>
                <span class="value"
                    >{metadata.readingTime.text.substring(-1, 5)}</span
                >
            </p>
        {/if}

        {#if categories}
            <ul class="categories">
                {#each categories as category}
                    <li class="category">
                        <a href={`category/${category}`} title={category}
                            >{category}</a
                        >
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</div>

{#if headings}
    <!-- Toc -->
{/if}

<div class="blog-post">
    {@render post()}
</div>

<style lang="scss">
    .heading {
        font-weight: 900;
        margin-bottom: 2rem;
        text-wrap: pretty;
    }
    .hero {
        border: 0.5px solid #5658565a;
        border-radius: 1rem;
        .metadata {
            padding: 0 1rem 1rem 1rem;
            p {
                color: var(--text-1);
                margin: 0;
                font-size: calc(0.8rem * var(--scale));
                line-height: calc(1.25rem * var(--scale));
                font-weight: 800;

                .descr {
                    text-transform: uppercase;
                    width: 7rem;
                    display: inline-block;
                }
                .value {
                    text-transform: uppercase;
                    letter-spacing: 0;
                }
            }
            .excerpt {
                margin-bottom: 2rem;
                // padding-left: 2rem;
                font-size: calc(1rem * var(--scale));
                line-height: calc(1.8rem * var(--scale));
                font-style: italic;
                font-weight: 500;
            }
            .categories {
                display: flex;
                flex-wrap: wrap;
                gap: 0.3rem;
                flex: 1;
                height: auto;
                margin-top: 1rem;
                margin-bottom: 0.5rem;
                .category {
                    a {
                        font-weight: 600;
                        font-size: calc(0.6rem * var(--scale));
                        background-color: var(--color-ld-accent-500);
                        text-transform: uppercase;
                        padding-inline: 1rem;
                        padding-block: 0.25rem;
                        font-style: italic;
                        border-radius: 1rem;
                        border: 3px solid var(--color-ld-accent-600);
                        box-sizing: border-box;
                        color: var(--color-ld-accent-700);
                        font-weight: 900;
                        &::after {
                            content: ",";
                        }
                        &:last-child {
                            &::after {
                                content: "";
                            }
                        }
                        &:first-of-type {
                        }
                        &:hover {
                            color: var(--color-ld-white-500);
                        }
                    }

                    /*&::before{
                    content: '#';
                }*/
                }
            }
        }
    }

    :global(.hero-image) {
        border-radius: 1rem;
        object-fit: cover;
    }
</style>
