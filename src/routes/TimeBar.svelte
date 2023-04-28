<main id="timebar">
    {#each [...Array(25).keys()] as i}
    <p>{i}AM</p>
    {/each}
</main>

<style>
    main {
        width: 40px;
        flex: none;
        overflow: scroll;

        border-right: 1px solid rgba(255, 255, 255, 0.05);

        display: flex;
        flex-direction: column;
        gap: 47.5px;
        background: #232323;

        height: fit-content;
        padding-top: 28px;

        position: sticky;
        left: 0;
        z-index: 3;
    }

    main::-webkit-scrollbar {
        display: none;
    }

    p {
        font-size: 11px;
        line-height: 13px;
        text-align: center;

        font-family: var(--font-mono);
        color: rgba(255, 255, 255, 0.7);
    }
</style>