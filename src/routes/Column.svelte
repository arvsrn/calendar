<script lang="ts">
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    export let date: string = "";
</script>

<main class:dark={['Sun', 'Sat'].includes(date.split(" ")[0])}>
    <p>{date}</p>

    <div class="container">
        <slot></slot>
        {#each [...Array(24).keys()] as _}
        <div class="divider"></div>
        {/each}
    </div>
</main>

<style>
    main {
        width: 200px;
        height: 1440px;

        flex: none;
    }

    main.dark {
        background: #202020;
    }

    div.container {
        height: 100%;
        width: 100%;
        padding: 0px 2px;

        position: relative;
        display: flex;
        flex-direction: column;
        gap: 60px;
        
        overflow: scroll;
        border-right: 1px solid rgba(255, 255, 255, 0.05);
    }

    div.divider {
        height: 1px;
        width: calc(100% + 4px);
        background: rgba(255, 255, 255, 0.025);
        flex: none;
    }

    p {
        width: 200px;
        height: 28px;

        text-align: center;
        line-height: 28px;

        font-size: 12px;
        font-family: var(--font-sans);
        color: rgba(255, 255, 255, 0.4);

        flex: none;
        user-select: none;

        position: sticky;
        top: 0;
        background: #232323;
        z-index: 2;

        border-bottom: 1px solid rgba(255, 255, 255, 0.025);
    }
</style>