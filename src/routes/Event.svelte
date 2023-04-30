<script lang="ts">
    import { onMount } from "svelte";
    import Button from "./Primitives/Button.svelte";
    import Blanket from "./Primitives/Blanket.svelte";
    import Popup from "./Primitives/Popup.svelte";
    import TextInput from "./Primitives/TextInput.svelte";
    import Main from "./DropdownMenu/Main.svelte";
    import Option from "./DropdownMenu/Option.svelte";
    import Colors from "./Colors.svelte";
    import MultilineTextInput from "./Primitives/MultilineTextInput.svelte";
    import TodoTask from "./TodoTask.svelte";
    import TodoTaskNew from "./TodoTaskNew.svelte";

    type COLORS = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray';
    const COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray'];
    const enum Dragging { TOP, BOTTOM, SELF, NONE };

    export let startTime: number;
    export let endTime: number;
    export let selectedColor: string = COLORS[0];
    
    let selectedColorIndex: number = 0;
    let finalEndTime: number = endTime - (endTime % 15)
    let finalStartTime: number = startTime - (startTime % 15);

    let mouse: [number, number] = [0, 0];

    const onDragStart = (direction: Dragging) => dragging = (dragging === Dragging.NONE ? direction : Dragging.NONE);
    const onDragEnd = () => dragging = Dragging.NONE;
    const onDragging = (event: MouseEvent) => {
        switch (dragging) {
            case Dragging.BOTTOM:
                if (((endTime + event.movementY) - startTime) >= 15) {
                    if (endTime + event.movementY < 1440)
                        endTime += event.movementY;
                    else endTime = 0;

                    break;
                }
            
            case Dragging.TOP:
                if (endTime - (startTime + event.movementY) >= 15) {
                    if (startTime + event.movementY > 0)
                        startTime += event.movementY;
                    else startTime = 0;

                    break;
                }
            
            case Dragging.SELF:
                if (startTime + event.movementY > 0 && endTime + event.movementY < 1440) {
                    const height_ = height;
                    startTime += event.movementY;
                    endTime = startTime + height_;
                } else if (startTime + event.movementY < 0) {
                    startTime = 0;
                } else if (endTime + event.movementY > 1440) {
                    endTime = 1440;
                }
        }
    };

    let dragging: Dragging = Dragging.NONE;
    let height: number = (endTime - startTime);
    let self: HTMLElement;

    export let name: string = "";
    export let description: string = "";

    let nameInputValue: string = name;
    let descriptionInputValue: string = description;

    $: height = (finalEndTime - finalStartTime);
    $: finalEndTime = endTime - (endTime % 15)
    $: finalStartTime = startTime - (startTime % 15);
    $: selectedColorIndex, selectedColor = COLORS[selectedColorIndex];

    // $: startTime, startTime = Math.max(startTime, 0);
    // $: endTime, endTime = Math.min(endTime, 1440);

    let editing: boolean = false;
    let showing: boolean = false;
</script>

<main on:contextmenu|preventDefault={event => {
    showing = true;
    mouse = [event.clientX, event.clientY];
}} class={selectedColor} class:grabbing={dragging === Dragging.SELF} class:sub-hour={height < 60} class:sub-half-hour={height < 45} style="height:{height}px !important;top:{finalStartTime}px;" bind:this={self} on:mousedown={e => onDragStart(Dragging.SELF)}>
    <div class="side-color"></div>

    <div class="handle-up" on:click={e => onDragStart(Dragging.TOP)}></div>
    <div class="handle-down" on:click={e => onDragStart(Dragging.BOTTOM)}></div>

    <h1>{name}</h1>
    <p style:color="white">{description}</p>
    <p>
        {
            Math.floor(finalStartTime/60) <= 12 ? 
                Math.floor(finalStartTime/60) 
                : Math.floor(finalStartTime/60) - 12
        }{Math.floor(((finalStartTime/60)%1)*60) !== 0 ? `:${Math.floor(((finalStartTime/60)%1)*60) < 10 ? '0' + Math.floor(((finalStartTime/60)%1)*60) : Math.floor(((finalStartTime/60)%1)*60)}` : ''}{
            (Math.floor(finalEndTime/60) < 12 ? 'AM' : 'PM') ===
            (Math.floor(finalStartTime/60) < 12 ? 'AM' : 'PM') ? '' : (Math.floor(finalStartTime/60) < 12 ? 'AM' : 'PM')
        }—{
            Math.floor(finalEndTime/60) <= 12 ? 
                Math.floor(finalEndTime/60) 
                : Math.floor(finalEndTime/60) - 12
        }{Math.floor(((finalEndTime/60)%1)*60) !== 0 ? `:${Math.floor(((finalEndTime/60)%1)*60) < 10 ? '0' + Math.floor(((finalEndTime/60)%1)*60) : Math.floor(((finalEndTime/60)%1)*60)}` : ''}{
            Math.floor(finalEndTime/60) < 12 ? 'AM' : 'PM'
        }
    </p>

    {#if showing}
    <div style="width:144px;height:fit-content;position:fixed;left:{mouse[0]}px;top:{mouse[1]}px;">
        <Main onClickOutside={() => showing = false}>
            <p style="color:#a0a0a0;padding:4px 12px;margin-bottom:8px;">{
                Math.floor(finalStartTime/60) <= 12 ? 
                    Math.floor(finalStartTime/60) 
                    : Math.floor(finalStartTime/60) - 12
            }{Math.floor(((finalStartTime/60)%1)*60) !== 0 ? `:${Math.floor(((finalStartTime/60)%1)*60) < 10 ? '0' + Math.floor(((finalStartTime/60)%1)*60) : Math.floor(((finalStartTime/60)%1)*60)}` : ''}{
                (Math.floor(finalEndTime/60) < 12 ? 'AM' : 'PM') ===
                (Math.floor(finalStartTime/60) < 12 ? 'AM' : 'PM') ? '' : (Math.floor(finalStartTime/60) < 12 ? 'AM' : 'PM')
            }—{
                Math.floor(finalEndTime/60) <= 12 ? 
                    Math.floor(finalEndTime/60) 
                    : Math.floor(finalEndTime/60) - 12
            }{Math.floor(((finalEndTime/60)%1)*60) !== 0 ? `:${Math.floor(((finalEndTime/60)%1)*60) < 10 ? '0' + Math.floor(((finalEndTime/60)%1)*60) : Math.floor(((finalEndTime/60)%1)*60)}` : ''}{
                Math.floor(finalEndTime/60) < 12 ? 'AM' : 'PM'
            } | {Math.floor((finalEndTime - finalStartTime) / 60)}h {Math.floor((finalEndTime - finalStartTime) % 60)}mins</p>

            <div style="margin-bottom:8px;">
                <Colors bind:currentIndex={selectedColorIndex}></Colors>
            </div>
            <Option onClick={() => {editing = true; showing = false;}}>Edit Event</Option>
        </Main>
    </div>
    {/if}
</main>

<svelte:window on:mousemove={onDragging} on:mouseup={onDragEnd} />

{#if editing}
<Blanket bind:toggle={editing}>
    <Popup onSlideOut={() => editing = false}>
        <h1 style="margin-bottom:8px;font-size:14px;color:#ededed;font-weight:bold;">Edit Event</h1>
        <TextInput bind:value={nameInputValue} placeholder="Event name"></TextInput>
        <MultilineTextInput bind:value={descriptionInputValue} placeholder="Event description"></MultilineTextInput>
        <h1 style="margin-bottom:8px;margin-top:16px;font-size:14px;color:#ededed;font-weight:bold;">Tasks for this Event</h1>
        <TodoTask editable={true}>This is a task assigned to this event.</TodoTask>
        <TodoTask editable={true}>This is a task assigned to this event.</TodoTask>
        <TodoTaskNew></TodoTaskNew>

        <div style="margin-left:auto;display:flex;flex-direction:row;gap:4px;margin-top:8px;">
            <Button appearance="link" onClick={() => editing = false}>Cancel</Button>
            <Button appearance="secondary" onClick={() => {
                name = nameInputValue || name;
                description = descriptionInputValue || description;
                editing = false;
            }}>Save</Button>
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

        cursor: grab;
        position: relative;
        overflow: hidden;
        z-index: 2;
    }

    main.grabbing {
        cursor: grabbing;
    }

    main.sub-hour {
        flex-direction: row;
        padding: 6px 24px;
    }

    main.sub-hour > p,
    main.sub-hour > h1 {
        line-height: 80%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    main.sub-half-hour {
        flex-direction: row;
        padding: 0px 24px;
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
        color: white;
        user-select: none;

        width: fit-content;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    h1 {
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

    main.red {
        background: rgba(249, 84, 72, 0.2);
    }

    main.red > p {
        color: rgba(249, 84, 72, 0.6);
    }

    main.red > div.side-color {
        background: rgb(249, 84, 72);
    }

    main.orange {
        background: rgba(237, 119, 61, 0.2);
    }

    main.orange > p {
        color: rgba(237, 119, 61, 0.6);
    }

    main.orange > div.side-color {
        background: rgb(237, 119, 61);
    }

    main.yellow {
        background: rgba(244, 190, 64, 0.2);
    }

    main.yellow > p {
        color: rgba(244, 190, 64, 0.6);
    }

    main.yellow > div.side-color {
        background: rgb(244, 190, 64);
    }

    main.green {
        background: rgba(102, 204, 138, 0.2);
    }

    main.green > p {
        color: rgba(102, 204, 138, 0.6);
    }

    main.green > div.side-color {
        background: rgb(102, 204, 138);
    }

    main.blue {
        background: rgba(76, 168, 223, 0.2);
    }

    main.blue > p {
        color: rgba(76, 168, 223, 0.6);
    }

    main.blue > div.side-color {
        background: rgb(76, 168, 223);
    }

    main.purple {
        background: rgba(150, 92, 245, 0.2);
    }

    main.purple > p {
        color: rgba(150, 92, 245, 0.8);
    }

    main.purple > div.side-color {
        background: rgb(150, 92, 245);
    }

    main.gray {
        background: rgba(184, 184, 184, 0.2);
    }

    main.gray > p {
        color: rgba(184, 184, 184, 0.6);
    }

    main.gray > div.side-color {
        background: rgb(184, 184, 184);
    }
</style>