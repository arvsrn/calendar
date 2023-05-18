<script lang="ts">
    import { page } from "$app/stores";
  import { onMount } from "svelte";
    import { addNotification, notifications } from "../core";
    // TODO: uncomment these lines for prod
    // import { dev } from '$app/environment';
    // import { inject } from '@vercel/analytics';
    import Toast from "./Toast.svelte";
  import Loader from "./Loader.svelte";
  import { fade } from "svelte/transition";
    
    // inject({ mode: dev ? 'development' : 'production' });

    notifications.set([]);
    $page.url.searchParams.forEach((v, k) => {
        if (k == 'error')
            addNotification({ heading: `Error: ${v}`, description: "You were redirected to the application page." });
    });

    let mounted: boolean = false;
    onMount(() => mounted = true);
</script>

{#if mounted}
    <slot></slot>
{:else}
<main out:fade>
    <Loader></Loader>
</main>
{/if}

<Toast></Toast>

<style>
    main {
        width: 100vw;
        height: 100vh;

        background: var(--gray0);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;

        overflow-y: auto;
        position: relative;
    }
</style>