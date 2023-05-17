<script lang="ts">
    export let percentage: number = 0;
</script>

<main style:margin-top="6px" style:margin-left="24px">
    <container>
        <div style:width="{percentage}%"></div>
    </container>
    <p>{percentage}% Finished {percentage === 100 ? '🥳' : ''}</p>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 2.5px;

        width: calc(100% - 24px);
        height: fit-content;
    }
    
    container {
        width: 100%;
        height: 4px;
        
        border-radius: 5px;
        background: var(--border2);
    }

    p {
        font-size: 10px;
        color: var(--text2);
        user-select: none;
        line-height: 16px;
    }

    container > div {
        height: 100%;
        background: #6AD28D;

        border-radius: 5px;

        transition: width 0.15s var(--ease);
    }
</style>