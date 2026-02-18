<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";

    type SplitMode = "chars" | "words";

    let {
        text,
        as = "h1",
        mode = "chars",
        baseColor = "currentColor",
        activeColor = "#8b5cf6",

        // stagger + timing
        stagger = 0.018,
        outDuration = 0.18,
        inDuration = 0.28,
        easeOut = "power2.in",
        easeIn = "power3.out",

        // hide/reveal motion
        outY = -120, // yPercent when hiding
        inFromY = 120, // yPercent before revealing
        className = "",

        excludeChars = [" ", "\u00A0"], // default: spaces
        excludePattern, // z.B. /[.,!?]/g
        exclude = (token: string) => false, // custom callback
    }: {
        text: string;
        as?: "h1" | "h2" | "p" | "span";
        mode?: SplitMode;
        baseColor?: string;
        activeColor?: string;
        stagger?: number;
        outDuration?: number;
        inDuration?: number;
        easeOut?: string;
        easeIn?: string;
        outY?: number;
        inFromY?: number;
        className?: string;
        excludeChars?: string[];
        excludePattern?: RegExp;
        exclude?: (token: string) => boolean;
    } = $props();

    let el = $state<HTMLElement | null>(null);
    let originalHTML = "";
    let ctx: gsap.Context | null = null;
    let tween: gsap.core.Timeline | null = null;

    let isActive = $state(false);

    function escapeHtml(s: string) {
        return s
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function splitToSpans(rawText: string, splitMode: SplitMode) {
        if (splitMode === "words") {
            const parts = rawText.split(/(\s+)/);
            return parts
                .map((p) => {
                    if (/^\s+$/.test(p)) return escapeHtml(p);

                    const isExcluded =
                        excludeChars.includes(p) ||
                        (excludePattern ? excludePattern.test(p) : false) ||
                        exclude(p);

                    return `<span class="seg" data-seg="word" data-skip="${isExcluded ? "true" : "false"}">${escapeHtml(p)}</span>`;
                })
                .join("");
        }

        return Array.from(rawText)
            .map((ch) => {
                const isExcluded =
                    excludeChars.includes(ch) ||
                    (excludePattern ? excludePattern.test(ch) : false) ||
                    exclude(ch);

                const safe = ch === " " ? "&nbsp;" : escapeHtml(ch);

                return `<span class="seg" data-seg="char" data-skip="${isExcluded ? "true" : "false"}" aria-hidden="true">${safe}</span>`;
            })
            .join("");
    }

    function animSegments() {
        if (!el) return [] as HTMLElement[];
        const all = Array.from(el.querySelectorAll<HTMLElement>(".seg"));
        return all.filter((n) => n.dataset.skip !== "true");
    }

    function runFlip(toActive: boolean) {
        if (!el) return;
        const segs = animSegments();
        const nextColor = toActive ? activeColor : baseColor;

        // kill any in-flight animation to keep it deterministic
        tween?.kill();
        gsap.killTweensOf(segs);

        tween = gsap.timeline();

        // Phase A: stagger OUT (hide)
        tween.to(segs, {
            opacity: 0,
            yPercent: outY,
            duration: outDuration,
            ease: easeOut,
            stagger: { each: stagger, from: "start" },
            overwrite: "auto",
        });

        // Swap color + prepare for reveal (still hidden)
        tween.set(segs, {
            color: nextColor,
            yPercent: inFromY,
        });

        // Phase B: stagger IN (reveal) in new color
        tween.to(segs, {
            opacity: 1,
            yPercent: 0,
            duration: inDuration,
            ease: easeIn,
            stagger: { each: stagger, from: "start" },
            overwrite: "auto",
        });
    }

    onMount(() => {
        if (!el) return;

        originalHTML = el.innerHTML;

        // split client-side only (SSR-safe)
        el.innerHTML = splitToSpans(text, mode);
        el.setAttribute("aria-label", text);

        ctx = gsap.context(() => {
            const segs = animSegments();
            gsap.set(segs, {
                display: "inline-block",
                opacity: 1,
                yPercent: 0,
                color: baseColor,
            });
        }, el);

        const toggle = () => {
            isActive = !isActive;
            runFlip(isActive);
        };

        // Toggle on hover-enter; persistent until next hover-enter
        const onEnter = () => toggle();

        // Mobile fallback
        const onClick = (e: MouseEvent) => {
            e.preventDefault();
            toggle();
        };

        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("click", onClick);

        return () => {
            el?.removeEventListener("pointerenter", onEnter);
            el?.removeEventListener("click", onClick);
            tween?.kill();
            ctx?.revert();
            if (el) el.innerHTML = originalHTML || escapeHtml(text);
        };
    });
</script>

<svelte:element
    this={as}
    bind:this={el}
    class={`splitFlip ${className}`}
    style="display:inline-block;"
>
    {text}
</svelte:element>

<style>
    .splitFlip {
        transform: translateZ(0);
        will-change: transform, opacity, color;
        cursor: default;
    }

    .splitFlip :global(.seg[data-seg="char"]) {
        white-space: pre;
    }
</style>
