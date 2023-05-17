<script lang="ts">
    import Main from './DropdownMenu/Main.svelte';
    import Option from './DropdownMenu/Option.svelte';
    
    export let done: boolean = false;
    export let showing: boolean = false;
</script>

<main>
    <div class="check-container">
        <button></button>
    </div>

    <p class:enabled={done} contenteditable="true" on:keydown={event => {
        if (event.key == 'Enter') event.preventDefault();
    }}></p>
</main>

<style>
    main {
        width: 100%;
        height: fit-content;

        display: flex;
        flex-direction: row;
        gap: 8px;

        position: relative;
    }

    div.check-container {
        width: fit-content;
        height: 100%;
    }

    button {
        outline: none;
        border: 1.5px solid var(--border3);
        border-radius: 5px;

        width: 16px;
        height: 16px;

        background: transparent;
        cursor: pointer;
        color: var(--text1);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    p {
        width: 100%;
        height: fit-content;

        word-wrap: break-word;

        font-size: 13px;
        font-weight: normal;
        color: var(--text1);
        line-height: 16px;
    }

    p.enabled {
        color: var(--text2);
        text-decoration: line-through;
    }

    p[contenteditable] {
        outline: none;
    }

    p[contenteditable]:empty:before {
        content: "Add new task";
        color: var(--text2);
        cursor: text;
    }
</style>