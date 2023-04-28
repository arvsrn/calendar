<main>
    <slot></slot>
</main>

<style>
    main {
        width: 360px;
        height: fit-content;

        background: #1c1c1c;
        border: 1px solid rgba(0, 0, 0, 0.3);
        border-radius: 12px;

        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 24px;
    }
</style>