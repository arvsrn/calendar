<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
  import Loader from "./Loader.svelte";
    
    onMount(() => {
        window.location.assign(`/?error=${$page.status}`);
    });
</script>

<main>
    <Loader></Loader>
</main>

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