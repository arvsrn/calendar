<script lang="ts">
    import Main from './DropdownMenu/Main.svelte';
    import Option from './DropdownMenu/Option.svelte';
    
    export let done: boolean = false;
    export let showing: boolean = false;

    // `direct` if this component is placed inside the Edit Event popup,
    // and `indirect` if this component is placed inside the sidebar
    export let origin: 'direct' | 'indirect' = 'direct';
    export let editable: boolean = false;
</script>

<main>
    <div class="check-container">
        <button class:enabled={done} on:click={() => done = !done}>
        {#if done}
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg> 
        {/if}
        </button>
    </div>

    <p class:enabled={done} on:click={() => done = editable ? done : !done} contenteditable={editable && !done} on:keydown={event => {
        if (event.key == 'Enter') event.preventDefault();
    }}><slot></slot></p>
</main>

<style>
    main {
        width: 100%;
        height: fit-content;

        display: flex;
        flex-direction: row;
        gap: 8px;

        position: relative;
        padding: 5px;
        transform: translate(-5px, -5px);
        border-radius: 10px;
        transition: background 0.15s var(--ease);
    }

    main:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    div.check-container {
        width: fit-content;
        height: 100%;
    }

    button {
        outline: none;
        border: 1.5px solid rgba(255, 255, 255, 0.1);
        border-radius: 5px;

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

    div.onhover:not(.hoverout) > button.options:hover {
        background: transparent;
    }

    button > svg {
        transform: scale(0.9);
    }

    button.options {
        border: 1px solid transparent;
    }

    button.options:hover {
        background: rgba(255, 255, 255, 0.06);
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

    p[contenteditable="false"] {
        cursor: pointer;
        user-select: none;
    }

    div.onhover {
        position: absolute;
        top: 0px;
        right: 0px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        padding: 2px;
        
        height: 100%;
        width: 50px;
        background: linear-gradient(90deg,
            rgba(28, 28, 28, 0), 
            rgba(28, 28, 28, 0.8) 40%, 
            rgba(28, 28, 28, 1.0) 60%
        );

        z-index: 5;
    }

    div.onhover.hoverout {
        display: none !important;
        pointer-events: none;
    }

    div.onhover.hoverout > * {
        display: none !important;
        pointer-events: none;
    }

    main:hover div.onhover,
    main:hover div.onhover * {
        display: flex !important;
        pointer-events: all;
    }

    p[contenteditable] {
        outline: none;
    }

    p[contenteditable]:empty:before {
        content: "Delete this task?";
        color: #7e7e7e;
        cursor: text;
    }
</style>