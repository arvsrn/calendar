<script lang="ts">
    import { onMount } from "svelte";

    const enum Dragging { TOP, BOTTOM, NONE };

    export let startTime: number;
    export let endTime: number;

    const onDragStart = (direction: Dragging) => dragging = dragging === Dragging.NONE ? direction : Dragging.NONE;
    const onDragEnd = () => dragging = Dragging.NONE;
    const onDragging = (event: MouseEvent) => {
        console.log(event.movementY);

        switch (dragging) {
            case Dragging.BOTTOM:
                endTime += event.movementY;
                break;
            
            case Dragging.TOP:
                startTime -= event.movementY;
                endTime += event.movementY;
                break;
        }
    };

    let dragging: Dragging = Dragging.NONE;
    let height: number = (endTime - startTime);
    let self: HTMLElement;

    $: height = (endTime - startTime);
    $: console.log(dragging);
    $: console.log(height);
</script>

<main style="height:{height}px !important;top:{startTime}px;" bind:this={self}>
    <div class="side-color"></div>

    <div class="handle-up" on:click={e => onDragStart(Dragging.TOP)}></div>
    <div class="handle-down"  on:click={e => onDragStart(Dragging.BOTTOM)}></div>

    {#if height > 61}
    <h1>Work on the Calendar app</h1>
    <p>
        {
            Math.floor(startTime/60) < 12 ? 
                Math.floor(startTime/60) 
                : Math.floor(startTime/60) - 12
        }:{Math.floor(((startTime/60)%1)*60)}{
            (Math.floor(endTime/60) < 12 ? 'AM' : 'PM') ===
            (Math.floor(startTime/60) < 12 ? 'AM' : 'PM') ? '' : (Math.floor(startTime/60) < 12 ? 'AM' : 'PM')
        }—{
            Math.floor(endTime/60) < 12 ? 
                Math.floor(endTime/60) 
                : Math.floor(endTime/60) - 12
        }:{Math.floor(((endTime/60)%1)*60)}{
            Math.floor(endTime/60) < 12 ? 'AM' : 'PM'
        }
    </p>
    {/if}
</main>

<svelte:window on:mousemove={onDragging} on:mouseup={onDragEnd} />

<style>
    main {
        width: 100%;

        flex: none;
        position: absolute;

        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 16px;

        background: #2D4935;
        border-radius: 6px;

        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    div.side-color {
        width: 3px;
        height: 100%;

        position: absolute;
        top: 0px;
        left: 0px;
        background: #6AD28D;
    }

    .handle-up, .handle-down {
        width: 100%;
        height: 5px;
        cursor: ns-resize;
        position: absolute;
        left: 0px;
    }

    .handle-up {
        top: 0px;
    }
    
    .handle-down {
        bottom: 0px;
    }

    h1, p {
        color: #FCEADD;
        user-select: none;

        width: 100%;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    h1 {
        color: #D1F7DD;
        font-weight: 600;
    }

    p {
        color: #5B9C71;
        font-size: 11px;
    }
</style>