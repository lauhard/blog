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
In the company I work, I had the request to show the tag of the latest deployment in the application.
The flow is push to the repo either on the production or the development branch. 
Then create a tag 

