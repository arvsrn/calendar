<main id="timebar">
    {#each [...Array(24).keys()] as i}
    <p>{(i < 12 ? i : i - 12) || 12}{i < 12 ? 'AM' : 'PM'}</p>
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
        padding-bottom: 60px;

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
        user-select: none;
    }
</style>