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

{#if metadata?.image}
    <Image src={metadata?.image} alt={"blogpost setup"} iClass="hero-image"
    ></Image>
{/if}
<h1 class="heading">{metadata.title}</h1>
<div class="metadata">
    <p class="excerpt">{metadata.excerpt}</p>
    <p>
        <span class="descr">Published: </span>
        <span class="value">{metadata.created}</span>
    </p>
    {#if metadata?.updated}
        <p>
            <span class="descr">Updated: </span>
            <span class="value">{metadata?.updated}</span>
        </p>
    {/if}
    {#if metadata.readingTime}
        <p>
            <span class="descr">Reading: </span>
            <span class="value">{metadata.readingTime.text}</span>
        </p>
    {/if}
    {#if metadata.author}
        <p>
            <span class="descr">Author: </span>
            <span class="value">{metadata.author}</span>
        </p>
    {/if}
    {#if categories}
        <div class="categories">
            <p>
                <span class="descr">Categories:</span>
                {#each categories as category}
                    <a
                        class="category"
                        href={`category/${category}`}
                        title={category}>{category}</a
                    >
                {/each}
            </p>
        </div>
    {/if}
</div>

{#if headings}
    <!-- Toc -->
{/if}

<div class="blog-post">
    {@render post()}
</div>

<style lang="scss">
    .heading {
        text-decoration: underline;
        font-weight: 700;
        line-height: 2.7rem;
    }

    .metadata {
        p {
            color: var(--text-1);
            margin: 0;
            .descr {
                font-weight: var(--font-weight-8);
                width: 107px;
                display: inline-block;
                text-transform: uppercase;
                font-size: var(--font-size-0);
            }
            .value {
                font-size: 0.9rem;
                font-size: 0.89rem;
            }
        }
        .excerpt {
            margin-bottom: 2rem;
        }
        .categories {
            margin-bottom: 2rem;
            .category {
                margin-right: 0.5rem;
                font-size: 0.89rem;
                text-transform: capitalize;
                &::after {
                    content: ",";
                }
                &:last-child {
                    &::after {
                        content: "";
                    }
                }
                /*&::before{
                    content: '#';
                }*/
            }
        }
    }
    
</style>
