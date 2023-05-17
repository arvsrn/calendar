<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    
    onMount(() => {
        window.location.assign(`/?error=${$page.status}`);
    });
</script>

<main>
    <div></div>
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;

        background: var(--gray1);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;

        overflow-y: auto;
        position: relative;
    }

    @keyframes donut-spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    div {
        display: inline-block;
        border: 4px solid rgba(255, 255, 255, 0.1);
        border-left-color: white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: donut-spin 1.2s linear infinite;
    }
</style>