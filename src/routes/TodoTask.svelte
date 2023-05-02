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

    <p class:enabled={done} contenteditable={editable && !done} on:keydown={event => {
        if (event.key == 'Enter') event.preventDefault();
    }}><slot></slot></p>

    <div class="onhover" class:hoverout={!showing}>
        <button class="options" on:click={() => showing = true}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

            {#if showing}
            <div style:width="200px" style:position="absolute" style:top="100%" style:right="0px">
                <Main onClickOutside={() => showing = false}>
                    {#if origin === 'indirect'}
                    <Option label="⌘E">
                        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.5 0.5H2.5C1.39543 0.5 0.5 1.39543 0.5 2.5V9.5C0.5 10.6046 1.39543 11.5 2.5 11.5H4.5M9.5 11.5H11.5C12.6046 11.5 13.5 10.6046 13.5 9.5V2.5C13.5 1.39543 12.6046 0.5 11.5 0.5H9.5M9.5 8.5H4.5C3.94772 8.5 3.5 8.05228 3.5 7.5V4.5C3.5 3.94772 3.94772 3.5 4.5 3.5H9.5C10.0523 3.5 10.5 3.94772 10.5 4.5V7.5C10.5 8.05228 10.0523 8.5 9.5 8.5Z" stroke="currentColor"/>
                        </svg>                              
                        Go to Event
                    </Option>
                    {:else}
                    <Option label="Del" appearance="danger">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.1377 4.2777L2.39032 8.6162C2.4519 9.67382 3.32752 10.4999 4.38693 10.4999H6.69835C7.76826 10.4999 8.64868 9.65793 8.69636 8.58908L8.88871 4.2777M11 2.44437H9.16667H7.33333M0 2.44437H1.83333H3.66667M3.66667 2.44437V1.5C3.66667 0.947715 4.11438 0.5 4.66667 0.5H6.33333C6.88562 0.5 7.33333 0.947715 7.33333 1.5V2.44437M3.66667 2.44437H7.33333" stroke="currentColor"/>
                        </svg>                                   
                        Delete
                    </Option>
                    {/if}
                </Main>
            </div>
            {/if}
        </button>
    </div>
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
        background: linear-gradient(90deg, rgba(28,28,28,0) 0%, rgba(28,28,28,0.9) 30%, rgba(28,28,28,1) 100%);

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