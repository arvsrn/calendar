<script lang="ts">
    import { onMount } from "svelte";
    import Button from "./Primitives/Button.svelte";
    import Blanket from "./Primitives/Blanket.svelte";
    import Popup from "./Popup.svelte";
    import TextInput from "./Primitives/TextInput.svelte";

    const enum Dragging { TOP, BOTTOM, SELF, NONE };

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
                startTime += event.movementY;
                break;
            
            case Dragging.SELF:
                startTime += event.movementY;
                endTime += event.movementY;
        }
    };

    let dragging: Dragging = Dragging.NONE;
    let height: number = (endTime - startTime);
    let self: HTMLElement;

    $: height = (endTime - startTime);
    $: console.log(dragging);
    $: console.log(height);

    let editing: boolean = false;
</script>

<main style="height:{height}px !important;top:{startTime}px;" bind:this={self} on:mousedown={e => onDragStart(Dragging.SELF)}>
    <div class="side-color"></div>

    <div class="handle-up" on:click={e => onDragStart(Dragging.TOP)}></div>
    <div class="handle-down" on:click={e => onDragStart(Dragging.BOTTOM)}></div>

    {#if height > 61}
    <h1>Work on the Calendar app</h1>
    <p>
        {
            Math.floor(startTime/60) <= 12 ? 
                Math.floor(startTime/60) 
                : Math.floor(startTime/60) - 12
        }{Math.floor(((startTime/60)%1)*60) !== 0 ? `:${Math.floor(((startTime/60)%1)*60) < 10 ? '0' + Math.floor(((startTime/60)%1)*60) : Math.floor(((startTime/60)%1)*60)}` : ''}{
            (Math.floor(endTime/60) < 12 ? 'AM' : 'PM') ===
            (Math.floor(startTime/60) < 12 ? 'AM' : 'PM') ? '' : (Math.floor(startTime/60) < 12 ? 'AM' : 'PM')
        }—{
            Math.floor(endTime/60) <= 12 ? 
                Math.floor(endTime/60) 
                : Math.floor(endTime/60) - 12
        }{Math.floor(((endTime/60)%1)*60) !== 0 ? `:${Math.floor(((endTime/60)%1)*60) < 10 ? '0' + Math.floor(((endTime/60)%1)*60) : Math.floor(((endTime/60)%1)*60)}` : ''}{
            Math.floor(endTime/60) < 12 ? 'AM' : 'PM'
        }
        <span>·</span>
        <button on:click={() => editing = true}>Edit event</button>
    </p>
    {/if}
</main>

<svelte:window on:mousemove={onDragging} on:mouseup={onDragEnd} />

{#if editing}
<Blanket bind:toggle={editing}>
    <Popup>
        <h1 style="margin-bottom:8px;font-size:14px;color:#ededed;font-weight:bold;">Edit Event</h1>
        <TextInput placeholder="Event name"></TextInput>
        <TextInput placeholder="Event description"></TextInput>
        <div style="margin-left:auto;display:flex;flex-direction:row;gap:4px;">
            <Button appearance="link" onClick={() => editing = false}>Cancel</Button>
            <Button appearance="secondary">Save</Button>
        </div>
    </Popup>
</Blanket>
{/if}   

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
        z-index: 3;
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

    main > p > span, main > p > button {
        display: none;
    }

    main:hover > p > span, main:hover > p > button {
        display: flex;
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
        min-height: fit-content;
        max-height: 100%;
    }

    p {
        color: #5B9C71;
        font-size: 11px;
        
        display: flex;
        flex-direction: row;
        gap: 4px;
    }
    
    button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 4px;

        font-family: var(--font-sans);
        font-size: 11px;
        color: #5B9C71;

        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;

        height: fit-content;
        width: fit-content;
        border-radius: 6px;
    }

    button:hover {
        text-decoration: underline;
    }
</style>