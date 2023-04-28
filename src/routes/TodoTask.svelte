<script lang="ts">
    export let done: boolean = false;
</script>

<main>
    <div class="check-container">
        <button class:enabled={done} on:click={() => done = !done}>
        {#if done}
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg> 
        {/if}
        </button>
    </div>

    <p class:enabled={done}><slot></slot></p>
</main>

<style>
    main {
        width: 100%;
        height: fit-content;

        display: flex;
        flex-direction: row;
        gap: 8px;
    }

    div.check-container {
        width: fit-content;
        height: 100%;
    }

    button {
        outline: none;
        border: 1.5px solid rgba(255, 255, 255, 0.1);
        border-radius: 4px;

        width: 16px;
        height: 16px;

        background: transparent;
        cursor: pointer;
        color: #EDEDED;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    button.enabled {
        background: rgba(255, 255, 255, 0.06);
    }

    button > svg {
        transform: scale(0.9);
    }

    p {
        width: 100%;
        height: fit-content;

        word-wrap: break-word;

        font-size: 13px;
        font-weight: normal;
        color: #ededed;
        line-height: 16px;
    }

    p.enabled {
        color: #a0a0a0;
        text-decoration: line-through;
    }
</style>