<main id="viewport">
    <slot></slot>
</main>

<style>
    main {
        width: 100%;
        height: 100%;

        overflow: scroll;

        display: flex;
        flex-direction: row;
    }

    main::-webkit-scrollbar {
        display: none;
    }
</style>