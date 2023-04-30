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

    p[contenteditable] {
        outline: none;
    }

    p[contenteditable]:empty:before {
        content: "Add new task";
        color: #7e7e7e;
        cursor: text;
    }
</style>