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
    import { addNotification, type CalendarEvent } from "../core";
    import { clickOutside } from "svelte-use-click-outside";

    type COLORS = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray';
    const COLORS: Array<COLORS> = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray'];
    const enum Dragging { TOP, BOTTOM, SELF, NONE };

    export let startTime: number;
    export let endTime: number;
    export let color: COLORS = COLORS[1];
    
    let colorIndex: number = COLORS.indexOf(color);
    let finalEndTime: number = endTime - (endTime % 15)
    let finalStartTime: number = startTime - (startTime % 15);

    let mouse: [number, number] = [0, 0];
    let focused: boolean = false;

    const onDragStart = (direction: Dragging) => {
        dragging = (dragging === Dragging.NONE ? direction : Dragging.NONE);
        focused = true;
    };
    const onDragEnd = () => dragging = Dragging.NONE;
    const onDragging = (event: MouseEvent) => {
        switch (dragging) {
            case Dragging.BOTTOM:
                if (((endTime + event.movementY) - startTime) >= 15) {
                    if (endTime + event.movementY < 1440)
                        endTime += event.movementY;
                    else endTime = 0;

                    break;
                } else {
                    dragging = Dragging.TOP;
                    onDragging(event);
                }
            
            case Dragging.TOP:
                if (endTime - (startTime + event.movementY) >= 15) {
                    if (startTime + event.movementY > 0)
                        startTime += event.movementY;
                    else startTime = 0;

                    break;
                } else {
                    dragging = Dragging.BOTTOM;
                    onDragging(event);
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

    const copyEvent = () => {
        addNotification({
            heading: "Event copied to clipboard",
            description: `"${name}"`,
        });
        const obj = {
            startTime: finalStartTime,
            endTime: finalEndTime,
            name,
            description,
            color,
            tasks: [],
        };
        navigator.clipboard.writeText(JSON.stringify(obj));
    };

    const cutEvent = () => {
        addNotification({
            heading: "Event cut to clipboard",
            description: "This action does not work yet."
        });
    };

    export let onDelete: () => void;
</script>

<main on:contextmenu|preventDefault={event => {
    showing = true;
    mouse = [event.clientX, event.clientY];
}} use:clickOutside={() => focused = false} class="{color} event" class:hour={height === 60} class:grabbing={dragging === Dragging.SELF} class:sub-hour={height < 60} class:sub-half-hour={height < 45} style="height:{height - 2}px !important;top:{finalStartTime}px;" bind:this={self} on:mousedown|self={e => onDragStart(Dragging.SELF)}>
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
    <div style="width:172px;height:fit-content;position:fixed;left:{mouse[0]}px;top:{mouse[1]}px;">
        <Main onClickOutside={() => showing = false}>
            <p style="color:#a0a0a0;padding:4px 12px;">{
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
            }</p>
            <p style="color:#a0a0a0;padding:0px 12px;">{Math.floor((finalEndTime - finalStartTime) / 60)}h {Math.floor((finalEndTime - finalStartTime) % 60)}mins</p>

            <div style="height:1px;width:100%;background:rgba(255, 255, 255, 0.035);margin:12px 0px;"></div>

            <div style="margin-bottom:8px;">
                <Colors bind:currentIndex={colorIndex}></Colors>
            </div>
            <Option onClick={() => {editing = true; showing = false;}}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0.5H2.5C1.39543 0.5 0.5 1.39543 0.5 2.5V7.5C0.5 8.60457 1.39543 9.5 2.5 9.5H7.5C8.60457 9.5 9.5 8.60457 9.5 7.5V4M5 5L9.5 0.5" stroke="currentColor"/>
                </svg>
                Edit Event
            </Option>
            <Option label="Del" appearance="danger" onClick={() => {
                showing = false;
                onDelete();
            }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.1377 4.2777L2.39032 8.6162C2.4519 9.67382 3.32752 10.4999 4.38693 10.4999H6.69835C7.76826 10.4999 8.64868 9.65793 8.69636 8.58908L8.88871 4.2777M11 2.44437H9.16667H7.33333M0 2.44437H1.83333H3.66667M3.66667 2.44437V1.5C3.66667 0.947715 4.11438 0.5 4.66667 0.5H6.33333C6.88562 0.5 7.33333 0.947715 7.33333 1.5V2.44437M3.66667 2.44437H7.33333" stroke="currentColor"/>
                </svg>                                   
                Delete
            </Option>
            
            <div style="height:1px;width:100%;background:rgba(255, 255, 255, 0.035);margin:4px 0px;"></div>

            <Option label="⌘C" onClick={() => {
                copyEvent();
                showing = false;
            }}>
                <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 0H2V0.5V1.05001C0.85888 1.28164 0 2.29052 0 3.5V9.5C0 10.8807 1.11929 12 2.5 12H3V11H2.5C1.67157 11 1 10.3284 1 9.5V3.5C1 2.84689 1.4174 2.29127 2 2.08535V2.5V3H2.5H6.5H7V2.5V2.08535C7.5826 2.29127 8 2.84689 8 3.5V6H9V3.5C9 2.29052 8.14112 1.28164 7 1.05001V0.5V0H6.5H2.5ZM3 2V1.5V1H6V1.5V2H3ZM4.5 7H4V7.5V7.91667H4.5V8H4.91667V7.91667H5V7.5H4.91667V7H4.5ZM6.58333 7H5.75V8H6.58333V7ZM8.25 7H7.41667V8H8.25V7ZM9.5 7H9.08333V7.5H9V7.91667H9.08333V8H9.5V7.91667H10V7.5V7H9.5ZM4 8.75V9.58333H5V8.75H4ZM10 9.58333V8.75H9V9.58333H10ZM4 10.4167V11.25H5V10.4167H4ZM10 11.25V10.4167H9V11.25H10ZM4.5 13H4.91667V12.5H5V12.0833H4.91667V12H4.5V12.0833H4V12.5V13H4.5ZM5.75 13H6.58333V12H5.75V13ZM7.41667 13H8.25V12H7.41667V13ZM9.08333 13H9.5H10V12.5V12.0833H9.5V12H9.08333V12.0833H9V12.5H9.08333V13Z" fill="white"/>
                </svg>                    
                Copy
            </Option>
            <Option label="⌘X" onClick={() => {
                cutEvent();
                showing = false;
            }}>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.51316 13.6471L6.58111 6.72559M5.58495 4.45098L6.58111 6.72559M5.58495 4.45098L6.33495 3.15194C6.74917 2.4345 6.50335 1.51712 5.78592 1.10291V1.10291C5.06848 0.688692 4.15109 0.934504 3.73688 1.65194V1.65194C3.32266 2.36938 3.56848 3.28677 4.28592 3.70098L5.58495 4.45098ZM6.58111 6.72559L4.08495 7.04906M4.08495 7.04906L14.0132 5.85291M4.08495 7.04906L3.33495 8.3481C2.92074 9.06553 2.00335 9.31135 1.28592 8.89713V8.89713C0.568477 8.48292 0.322664 7.56553 0.736877 6.8481V6.8481C1.15109 6.13066 2.06848 5.88484 2.78592 6.29906L4.08495 7.04906Z" stroke="currentColor"/>
                    </svg>                    
                Cut
            </Option>
        </Main>
    </div>
    {/if}
</main>

<svelte:window on:mousemove={onDragging} on:mouseup={onDragEnd} on:keydown={event => {
    if (focused && (event.ctrlKey || event.metaKey)) {
        switch (event.key) {
            case 'c': 
                copyEvent();
                break;
            case 'x':
                cutEvent()
                break;
            default: null
        }
        
    }
}} />

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
        gap: 2px;
        padding: 16px;

        background: #2D4935;
        border-radius: 6px;

        cursor: grab;
        overflow: hidden;
        z-index: 2;

        transition: background 0.15s var(--ease);
    }

    main.grabbing {
        cursor: grabbing;
    }

    main.sub-hour {
        flex-direction: row;
        padding: 6px 16px;
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
        padding: 0px 16px;
    }

    main.hour {
        gap: 0px;
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
        max-width: 100%;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    h1 {
        font-weight: 600;
    }

    p {
        color: #5B9C71;
        font-size: 11px;
        
        display: flex;
        flex-direction: row;
        gap: 4px;
    }

    main.red {
        background: rgba(252, 79, 79, 0.15);
    }

    main.red > p {
        color: rgba(252, 79, 79, 0.6);
    }

    main.red > div.side-color {
        background: rgb(252, 79, 79);
    }

    main.orange {
        background: rgba(237, 119, 61, 0.15);
    }

    main.orange > p {
        color: rgba(237, 119, 61, 0.6);
    }

    main.orange > div.side-color {
        background: rgb(237, 119, 61);
    }

    main.yellow {
        background: rgba(244, 190, 64, 0.15);
    }

    main.yellow > p {
        color: rgba(244, 190, 64, 0.6);
    }

    main.yellow > div.side-color {
        background: rgb(244, 190, 64);
    }

    main.green {
        background: rgba(102, 204, 138, 0.15);
    }

    main.green > p {
        color: rgba(102, 204, 138, 0.6);
    }

    main.green > div.side-color {
        background: rgb(102, 204, 138);
    }

    main.blue {
        background: rgba(76, 168, 223, 0.15);
    }

    main.blue > p {
        color: rgba(76, 168, 223, 0.6);
    }

    main.blue > div.side-color {
        background: rgb(76, 168, 223);
    }

    main.purple {
        background: rgba(150, 92, 245, 0.15);
    }

    main.purple > p {
        color: rgba(150, 92, 245, 0.8);
    }

    main.purple > div.side-color {
        background: rgb(150, 92, 245);
    }

    main.gray {
        background: #3E3E3E;
    }

    main.gray > p {
        color: rgba(184, 184, 184, 0.6);
    }

    main.gray > div.side-color {
        background: #b8b8b8;
    }
</style>