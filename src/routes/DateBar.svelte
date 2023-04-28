<script lang="ts">
    import { onMount } from "svelte";

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let self: HTMLElement;
</script>

<main id="ribbon">
    {#each [...Array(30).keys()] as i}
    <p>{days[new Date(`4/${i+1}/23`).getDay()]} {i + 1}</p>
    {/each}
</main>

<style>
    main {
        width: 100%;
        height: 28px;
        flex: none;
        margin-left: 40px;

        display: flex;
        flex-direction: row;
        overflow: scroll;
    }

    main > p {
        width: 200px;
        height: 100%;

        text-align: center;
        line-height: 28px;

        font-size: 12px;
        font-family: var(--font-sans);
        color: rgba(255, 255, 255, 0.4);

        flex: none;
        user-select: none;
    }

    main::-webkit-scrollbar {
        display: none;
    }
</style>