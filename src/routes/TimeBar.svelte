<script lang="ts">
    let current: Date = new Date();

    const updateCurrentTime = () => {
        current = new Date()
        setTimeout(updateCurrentTime, 60_000);
    };

    updateCurrentTime();
</script>

<main id="timebar">
    <div>
        {#each [...Array(24).keys()] as i}
        <p style:top="{(60 * i) - 1.5}px">{(i < 12 ? i : i - 12) || 12}{i < 12 ? 'AM' : 'PM'}</p>
        {/each}

        <p style:top="{60 * (current.getHours() + current.getMinutes()/60)}px" class="currentTime">
            {current.getHours() > 12 ? current.getHours() - 12 : current.getHours()}{current.getMinutes() !== 0 ? `:${current.getMinutes() < 10 ? '0' + current.getMinutes() : current.getMinutes()}` : ''}{current.getHours() >= 12 ? 'PM' : 'AM'}
        </p>
    </div>    
</main>

<style>
    main {
        width: 60px;
        flex: none;
        overflow: visible;

        border-right: 1px solid var(--border2);

        background: var(--gray1);

        height: fit-content;
        padding-top: calc(28px - 7.5px); /* height of date bar - half of the height of one p elemet */

        position: sticky;
        left: 0;
        z-index: 7;
    }

    main::-webkit-scrollbar,
    div::-webkit-scrollbar {
        display: none;
    }

    div {
        width: 100%;
        height: 1440px;

        position: relative;
    }

    div > * {
        position: absolute;
    }

    p {
        font-size: 10px;
        line-height: 13px;
        text-align: end;
        width: 100%;
        padding-right: 6px;

        font-family: var(--font-sans);
        color: var(--text2);
        user-select: none;
    }

    p.currentTime {
        font-weight: 500;
        color: white;
        letter-spacing: 0.008em;
        position: relative;
        overflow: visible;
    }

    p.currentTime::after {
        content: "";
        width: 100vw;
        background: rgba(255, 255, 255, 0.1);
        height: 1px;

        position: absolute;
        left: 100%;
        top: calc(50% - 1.5px);
        transform: translateX(1px);
        z-index: -1;
    }
</style>