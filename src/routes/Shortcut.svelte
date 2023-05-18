<main>
    <slot></slot>
</main>

<style>
    main {
        width: fit-content;
        height: fit-content;
        border-radius: 4px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 2px 4px;

        font-size: 13px;
        color: var(--text1);
        background: var(--border2);
    }
</style>