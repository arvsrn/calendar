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
    export let color: string = COLORS[0];
    
    let colorIndex: number = COLORS.indexOf(color);
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
    $: colorIndex, color = COLORS[colorIndex];

    // $: startTime, startTime = Math.max(startTime, 0);
    // $: endTime, endTime = Math.min(endTime, 1440);

    let editing: boolean = false;
    let showing: boolean = false;
</script>

<main on:contextmenu|preventDefault={event => {
    showing = true;
    mouse = [event.clientX, event.clientY];
}} class={color} class:grabbing={dragging === Dragging.SELF} class:sub-hour={height < 60} class:sub-half-hour={height < 45} style="height:{height}px !important;top:{finalStartTime}px;" bind:this={self} on:mousedown|self={e => onDragStart(Dragging.SELF)}>
    <div on:mousedown|self={e => onDragStart(Dragging.SELF)} class="side-color"></div>

    <div class="handle-up" on:mousedown={e => onDragStart(Dragging.TOP)}></div>
    <div class="handle-down" on:mousedown={e => onDragStart(Dragging.BOTTOM)}></div>

    <h1 on:mousedown|self={e => onDragStart(Dragging.SELF)}>{name}</h1>
    <p on:mousedown|self={e => onDragStart(Dragging.SELF)} style:color="white">{description}</p>
    <p on:mousedown|self={e => onDragStart(Dragging.SELF)}>
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
                <Colors bind:currentIndex={colorIndex}></Colors>
            </div>
            <Option onClick={() => {editing = true; showing = false;}}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0.5H2.5C1.39543 0.5 0.5 1.39543 0.5 2.5V7.5C0.5 8.60457 1.39543 9.5 2.5 9.5H7.5C8.60457 9.5 9.5 8.60457 9.5 7.5V4M5 5L9.5 0.5" stroke="currentColor"/>
                </svg>
                Edit Event
            </Option>
            <Option label="Del" appearance="danger">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.1377 4.2777L2.39032 8.6162C2.4519 9.67382 3.32752 10.4999 4.38693 10.4999H6.69835C7.76826 10.4999 8.64868 9.65793 8.69636 8.58908L8.88871 4.2777M11 2.44437H9.16667H7.33333M0 2.44437H1.83333H3.66667M3.66667 2.44437V1.5C3.66667 0.947715 4.11438 0.5 4.66667 0.5H6.33333C6.88562 0.5 7.33333 0.947715 7.33333 1.5V2.44437M3.66667 2.44437H7.33333" stroke="currentColor"/>
                </svg>                                   
                Delete
            </Option>
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