<script lang="ts">
    import Image from "$lib/components/Image.svelte";
    
    let { posts = [], currentSlug = "" } = $props();

    let sliderContainer: HTMLElement;

    // Filter to only published posts
    let publishedPosts = $derived(posts.filter((p: any) => p?.metadata?.published));

    let canScrollLeft = $state(false);
    let canScrollRight = $state(false);

    function updateScrollState() {
        if (!sliderContainer) return;
        canScrollLeft = sliderContainer.scrollLeft > 4;
        canScrollRight = sliderContainer.scrollLeft + sliderContainer.clientWidth < sliderContainer.scrollWidth - 4;
    }

    function scroll(direction: 'left' | 'right') {
        if (!sliderContainer) return;
        const scrollAmount = sliderContainer.clientWidth;
        sliderContainer.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }

    $effect(() => {
        if (sliderContainer) {
            const currentItem = sliderContainer.querySelector('.is-current');
            if (currentItem) {
                currentItem.scrollIntoView({ behavior: 'instant', inline: 'center', block: 'nearest' });
            }
            updateScrollState();

            sliderContainer.addEventListener('scroll', updateScrollState, { passive: true });
            const ro = new ResizeObserver(updateScrollState);
            ro.observe(sliderContainer);

            return () => {
                sliderContainer.removeEventListener('scroll', updateScrollState);
                ro.disconnect();
            };
        }
    });

</script>

<div class="blog-slider-section">
    <h3 class="slider-title">More Posts</h3>

    <div class="slider-wrapper">
        {#if canScrollLeft}
            <button class="scroll-btn prev-btn" aria-label="Previous Posts" onclick={() => scroll('left')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
        {/if}

        <div class="slider-container" bind:this={sliderContainer}>
            {#each publishedPosts as post}
                {@const isCurrent = post?.metadata?.slug === currentSlug}

                {#if isCurrent}
                    <div class="slider-item is-current" aria-current="page">
                        <div class="card-inner">
                            <div class="image-wrapper">
                                {#if post?.metadata?.image}
                                    <Image src={post.metadata.image} alt={post.metadata.title} className="slider-img" width="100%" height="200px" />
                                {/if}
                            </div>
                            <h4 class="post-title">{post?.metadata?.title}</h4>
                            <span class="status-label">Current Post</span>
                        </div>
                    </div>
                {:else}
                    <a href="/posts/{post?.metadata?.slug}" class="slider-item">
                        <div class="card-inner">
                            <div class="image-wrapper" style="view-transition-name: post-img-{post?.metadata?.slug}">
                                {#if post?.metadata?.image}
                                    <Image src={post.metadata.image} alt={post.metadata.title} className="slider-img" width="100%" height="200px" />
                                {/if}
                            </div>
                            <h4 class="post-title" style="view-transition-name: post-title-{post?.metadata?.slug}">{post?.metadata?.title}</h4>
                        </div>
                    </a>
                {/if}
            {/each}
        </div>

        {#if canScrollRight}
            <button class="scroll-btn next-btn" aria-label="Next Posts" onclick={() => scroll('right')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
        {/if}
    </div>
</div>

<style>
    .blog-slider-section {
        margin-top: var(--space-12);
        padding-top: var(--space-8);
        border-top: 1px solid var(--color-ld-white-500);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        container-type: inline-size;
    }

    .slider-title {
        color: var(--color-ld-accent-500);
        margin-bottom: var(--space-6);
        text-align: center;
    }

    .slider-wrapper {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
    }

    .slider-container {
        display: flex;
        gap: var(--space-4);
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none; /* Firefox */
        width: 100%;
        padding: var(--space-4);
        scroll-behavior: smooth;
    }

    .slider-container::-webkit-scrollbar {
        display: none; /* Chrome/Safari */
    }

    .slider-item {
        scroll-snap-align: center;
        flex: 0 0 calc(33.333% - var(--space-4));
        min-width: 250px;
        text-decoration: none;
        color: inherit;
        transition: transform var(--transition-base) ease, opacity var(--transition-base) ease;
    }

    @container (max-width: 800px) {
        .slider-item {
            flex: 0 0 calc(50% - var(--space-4));
        }
    }

    @container (max-width: 500px) {
        .slider-item {
            flex: 0 0 100%;
        }
    }

    .card-inner {
        background-color: var(--color-ld-white-300);
        border: var(--border-default);
        border-radius: var(--radius-card);
        padding: var(--space-4);
        height: 100%;
        display: flex;
        flex-direction: column;
        box-shadow: var(--shadow-sm);
        transition: box-shadow var(--transition-base) ease, border-color var(--transition-base) ease;
    }

    .slider-item:not(.is-current):hover .card-inner {
        /* transform: translateY(-4px); */
        box-shadow: var(--shadow-md);
        border-color: var(--color-ld-accent-500);
        transition: all var(--transition-base) ease-in-out;
    }

    .image-wrapper {
        width: 100%;
        height: 140px;
        background: var(--color-ld-white-400);
        border-radius: var(--radius-button);
        overflow: hidden;
        margin-bottom: var(--space-4);
    }

    :global(.slider-img) {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .post-title {
        font-size: calc(var(--base-font-size) * 1.15);
        color: var(--color-ld-accent-500);
        margin: 0;
        line-height: 1.2;
        text-wrap: balance;
    }

    /* Current post styling */
    .slider-item.is-current {
        opacity: 0.6;
        cursor: default;
        filter: grayscale(80%);
    }

    .slider-item.is-current .card-inner {
        box-shadow: inset 0 0 0 2px var(--color-ld-white-500);
    }

    .status-label {
        margin-top: auto;
        padding-top: var(--space-2);
        font-size: 0.8rem;
        text-transform: uppercase;
        font-weight: bold;
        color: var(--color-ld-black-600);
    }

    /* Scroll buttons */
    .scroll-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        background: var(--color-ld-white-400);
        border: 1px solid var(--color-ld-accent-500);
        color: var(--color-ld-accent-500);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: var(--shadow-md);
        transition: background-color var(--transition-base) ease, color var(--transition-base) ease;
    }

    .scroll-btn:hover {
        background: var(--color-ld-accent-500);
        color: var(--color-ld-white-400);
    }

    .prev-btn { left: -20px; }
    .next-btn { right: -20px; }

    @container (max-width: 900px) {
        .prev-btn { left: 0; }
        .next-btn { right: 0; }
    }
</style>
