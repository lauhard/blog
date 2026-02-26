---
title: 'Automated Testing and Deployment for SvelteKit + Cloudflare Workers'
excerpt: 'Vitest unit tests that run automatically on every push and PR. Type checking with svelte-check before every deploy. GitHub Actions as the automation engine — no manual deploys. Two environments: dev (workers.dev) and production (custom domain). Tag-based deploys — you control exactly when code goes live. Automatic tag cleanup when CI fails — no broken tags left behind. Version injection — the deploy tag is baked into the app at build time and readable at runtime.'

author: 'Andreas Launard'
created: 'Oct 20, 2024'
updated: 'Oct 20, 2024'
categories:
    - svelte
    - testing
    - github
    - cloudflare
published: true
image: '/img/bp1_small.png'
---

<script>
    import Image from "$lib/components/Image.svelte";
</script>

## Foreword
I recently got to clean up and update a legacy application at work. One requirement sounded deceptively simple: we needed to display the git tag of the most recent production deployment inside the app.
It wasn’t trivial, though. First I had to understand how our GitHub Actions pipeline actually deploys, and then figure out how to inject the deploy tag into the build so the app can expose it at runtime.
Since I’d never built a CI/CD pipeline myself, this turned into a deep dive into automated deployments, Git, and GitHub.
In this post, I’ll share what I learned by walking through a simple GitHub Actions CI/CD pipeline and how to inject the deployment tag into the build.
test

