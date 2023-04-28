<script lang="ts">
    export let percentage: number = 0;
</script>

<main style:margin-top="6px">
    <container>
        <div style:width="{percentage}%"></div>
    </container>
    <p>{percentage}% tasks completed {percentage === 100 ? '🥳' : ''}</p>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 2.5px;

        width: 100%;
        height: fit-content;
    }
    
    container {
        width: 100%;
        height: 5px;
        
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.05);
    }

    p {
        font-size: 10px;
        color: #a0a0a0;
        user-select: none;
        line-height: 16px;
    }

    container > div {
        height: 100%;
        background: #6AD28D;

        border-radius: 5px;

        transition: width 0.15s ease-in-out;
    }
</style>