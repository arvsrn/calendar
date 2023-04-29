<!--Component to input a color out of a bunch of choices-->

<script lang="ts">
    import { fade } from "svelte/transition";

    export let choices: Array<string> = ["#E93F33", "#ED773D", "#F4BE40", "#66CC8A", "#4CA8DF", "#985DF6", "#B8B8B8"];
    export let current: string = choices[0];
    let currentIndex: number = 0;

    $: current = choices[currentIndex];
</script>

<main>
    {#each choices as choice, i}
    <div style:background={choice} on:click={() => currentIndex = i} class:selected={currentIndex === i}>
        {#if currentIndex === i}
        <svg transition:fade={{ duration: 100 }} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg> 
        {/if}
    </div>
    {/each}
</main>

<style>
    main {
        width: 100%;
        height: fit-content;
        padding: 0px 12px;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 6px;
    }

    div {
        width: 12px;
        height: 12px;
        border-radius: 4px;
        cursor: default;
        transition: transform 0.1s var(--ease);
        
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div.selected {
        transform: scale(1.3);
    }

    div > svg {
        color: black;
        transform: scale(0.8);
    }
</style>