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

        animation: 0.2s enter ease-in;
    }

    @keyframes enter {
        from {
            transform: translateY(5px);
            opacity: 50%;
        }

        to {
            transform: translateY(0px);
            opacity: 100%;
        }
    }
</style>