<script lang="ts">
    const title = "alau.at";
    const letters = title.split("");
    // Unique timing per letter so glitches feel independent
    const glitchDelays =    [0.3, 1.4, 0.8, 2.1, 0.5, 1.9, 1.1];
    const glitchDurations = [3.2, 4.3, 2.9, 3.8, 4.6, 3.1, 2.6];
</script>

<a href="/" class="animated-title">
    {#each letters as letter, i}
        <span
            class="letter-wrapper"
            data-letter={letter}
            style="--delay: {i * 0.05}s; --glitch-delay: {glitchDelays[i]}s; --glitch-dur: {glitchDurations[i]}s;"
        >
            <span class="base-letter">{letter}</span>
            <span class="alt-letter">{letter}</span>
        </span>
    {/each}
</a>

<style>
    .animated-title {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: var(--color-ld-accent-500);
        position: relative;
        height: 100%;
        margin-inline: 1.5rem;
    }

    .letter-wrapper {
        position: relative;
        display: inline-block;
    }

    .base-letter,
    .alt-letter {
        display: inline-block;
        font-size: 2rem;
        letter-spacing: -0.05em;
        font-family: "Zodiak", serif;
        font-weight: 600;
    }

    /* Base: visible by default, slides out on hover */
    .base-letter {
        transform: translateY(0);
        transition:
            opacity 0.15s ease,
            filter 0.15s ease,
            transform 0.15s ease;
        transition-delay: calc(var(--delay) + 0.15s);
    }

    /* Alt: hidden by default, slides in on hover */
    .alt-letter {
        position: absolute;
        inset: 0;
        opacity: 0;
        color: var(--color-ld-accent-600);
        transform: translateY(20px);
        transition:
            opacity 0.15s ease,
            filter 0.15s ease,
            transform 0.15s ease;
        transition-delay: var(--delay);
    }

    /* ── Glitch pseudo-elements (always-on, hidden on hover) ── */

    .letter-wrapper::before,
    .letter-wrapper::after {
        content: attr(data-letter);
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        font-size: 2rem;
        font-family: "Zodiak", serif;
        font-weight: 600;
        letter-spacing: -0.05em;
        pointer-events: none;
        opacity: 0;
    }

    /* Red channel ghost */
    .letter-wrapper::before {
        color: var(--color-ld-accent-600);
        animation: glitch-red var(--glitch-dur, 3.5s) infinite;
        animation-delay: var(--glitch-delay, 0s);
    }

    /* Cyan channel ghost */
    .letter-wrapper::after {
        color: var(--color-ld-accent-400);
        animation: glitch-cyan var(--glitch-dur, 3.5s) infinite;
        animation-delay: var(--glitch-delay, 0s);
    }

    /* Base letter subtle flicker (only when not hovered) */
    .animated-title:not(:hover) .base-letter {
        animation: base-flicker var(--glitch-dur, 3.5s) infinite;
        animation-delay: var(--glitch-delay, 0s);
    }

    /* ── Hover: stagger slide only ── */

    .animated-title:hover .base-letter {
        opacity: 0;
        filter: blur(4px);
        transform: translateY(-20px);
        transition-delay: var(--delay);
    }

    .animated-title:hover .alt-letter {
        opacity: 1;
        filter: none;
        transform: translateY(0);
        transition-delay: calc(var(--delay) + 0.15s);
    }

    /* Kill glitch layers during hover so they don't bleed over the alt letter */
    .animated-title:hover .letter-wrapper::before,
    .animated-title:hover .letter-wrapper::after {
        animation: none;
        opacity: 0;
    }

    /* ── Keyframes ── */

    /* Red channel: top-slice displaced right, then bottom-slice left */
    @keyframes glitch-red {
        0%,  79%  { opacity: 0; transform: none; clip-path: none; }

        /* burst 1 */
        80%   { opacity: 0.95; transform: translateX(7px);              clip-path: polygon(0 0,   100% 0,   100% 38%,  0 38%);  }
        80.8% { opacity: 0.85; transform: translateX(-4px) skewX(-6deg);clip-path: polygon(0 52%, 100% 52%, 100% 100%,0 100%); }
        81.6% { opacity: 1;    transform: translateX(5px);               clip-path: polygon(0 0,   100% 0,   100% 100%,0 100%); }
        82.4% { opacity: 0;    transform: none; clip-path: none; }

        /* burst 2 — smaller */
        91%   { opacity: 0; }
        91.6% { opacity: 0.75; transform: translateX(-5px) skewX(4deg); clip-path: polygon(0 22%, 100% 22%, 100% 68%,0 68%); }
        92.4% { opacity: 0; transform: none; clip-path: none; }

        100%  { opacity: 0; }
    }

    /* Cyan channel: offset by ~one frame from red, opposite direction */
    @keyframes glitch-cyan {
        0%,  79.4% { opacity: 0; transform: none; clip-path: none; }

        /* burst 1 */
        80.4% { opacity: 0.95; transform: translateX(-7px);             clip-path: polygon(0 0,   100% 0,   100% 38%,  0 38%);  }
        81.2% { opacity: 0.85; transform: translateX(4px)  skewX(6deg); clip-path: polygon(0 52%, 100% 52%, 100% 100%,0 100%); }
        82%   { opacity: 1;    transform: translateX(-5px);              clip-path: polygon(0 0,   100% 0,   100% 100%,0 100%); }
        82.8% { opacity: 0;    transform: none; clip-path: none; }

        /* burst 2 */
        91.4% { opacity: 0; }
        92%   { opacity: 0.75; transform: translateX(5px) skewX(-4deg); clip-path: polygon(0 22%, 100% 22%, 100% 68%,0 68%); }
        92.8% { opacity: 0; transform: none; clip-path: none; }

        100%  { opacity: 0; }
    }

    /* Base letter: brief brightness spikes in sync with pseudo-element bursts */
    @keyframes base-flicker {
        0%,  79%  { filter: none; }
        80%        { filter: brightness(1.6) blur(0.4px); }
        80.8%      { filter: brightness(0.6); }
        81.6%      { filter: brightness(2) blur(0.2px); }
        82.4%      { filter: none; }

        91%        { filter: none; }
        91.6%      { filter: brightness(0.4) blur(0.5px); }
        92.4%      { filter: none; }

        100%       { filter: none; }
    }
</style>
