<script lang="ts">
    export let label: string = "";
    export let onClick: () => void = () => {};
    export let appearance: 'danger' | 'normal' = 'normal';

    export let submenu: boolean = false;
    export let showingSubmenu: boolean = false;
</script>

<main on:click={onClick} class={appearance} on:mouseenter={() => showingSubmenu = true} on:mouseleave={() => showingSubmenu = false}>
    <slot></slot>

    {#if label}
        <p>{label}</p>
    {/if}

    {#if submenu}
        <p>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </p>
    {/if}

    {#if showingSubmenu && submenu}
        <div class="submenu">
            <slot name="submenu"></slot>
        </div>
    {/if}
</main>

<style>
    main {
        width: 100%;
        height: 32px;

        background: transparent;

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;
        padding: 0px 12px;

        overflow: visible;

        flex: none;
        cursor: pointer;

        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 12.5px;
        user-select: none;

        position: relative;
    }

    main.normal {
        color: var(--text1);
    }

    main:hover {
        background: var(--border2);
    }

    main.danger {
        color: rgb(249, 84, 72);
    }

    main > p {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 12.5px;
        color: var(--text2);
        margin-left: auto;
    }

    div.submenu {
        position: absolute;
        right: calc(100% - 2px);
        top: 0px;
        width: fit-content;
        height: fit-content;
    }
</style>