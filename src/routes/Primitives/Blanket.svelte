<script lang="ts">
    import { fade } from "svelte/transition";

    export let toggle: boolean;
    export let style: string = "";
</script>

<main on:click|self={() => toggle = false} transition:fade={{ duration: 80 }} on:keydown={() => { /* to get a11y to shut up */ }} {style}>
    <slot></slot>
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;

        background: rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(1.1px);
        z-index: 1200;

        position: fixed;
        top: 0px;
        left: 0px;

        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: all;
    }
</style>