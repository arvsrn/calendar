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
    <div style="width:144px;height:fit-content;position:fixed;left:{mouse[0]}px;top:{mouse[1]}px;">
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
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 2V1H10V2H5ZM4.75 0C4.33579 0 4 0.335786 4 0.75V1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H7V13H3.5C3.22386 13 3 12.7761 3 12.5V2.5C3 2.22386 3.22386 2 3.5 2H4V2.25C4 2.66421 4.33579 3 4.75 3H10.25C10.6642 3 11 2.66421 11 2.25V2H11.5C11.7761 2 12 2.22386 12 2.5V7H13V2.5C13 1.67157 12.3284 1 11.5 1H11V0.75C11 0.335786 10.6642 0 10.25 0H4.75ZM9 8.5C9 8.77614 8.77614 9 8.5 9C8.22386 9 8 8.77614 8 8.5C8 8.22386 8.22386 8 8.5 8C8.77614 8 9 8.22386 9 8.5ZM10.5 9C10.7761 9 11 8.77614 11 8.5C11 8.22386 10.7761 8 10.5 8C10.2239 8 10 8.22386 10 8.5C10 8.77614 10.2239 9 10.5 9ZM13 8.5C13 8.77614 12.7761 9 12.5 9C12.2239 9 12 8.77614 12 8.5C12 8.22386 12.2239 8 12.5 8C12.7761 8 13 8.22386 13 8.5ZM14.5 9C14.7761 9 15 8.77614 15 8.5C15 8.22386 14.7761 8 14.5 8C14.2239 8 14 8.22386 14 8.5C14 8.77614 14.2239 9 14.5 9ZM15 10.5C15 10.7761 14.7761 11 14.5 11C14.2239 11 14 10.7761 14 10.5C14 10.2239 14.2239 10 14.5 10C14.7761 10 15 10.2239 15 10.5ZM14.5 13C14.7761 13 15 12.7761 15 12.5C15 12.2239 14.7761 12 14.5 12C14.2239 12 14 12.2239 14 12.5C14 12.7761 14.2239 13 14.5 13ZM14.5 15C14.7761 15 15 14.7761 15 14.5C15 14.2239 14.7761 14 14.5 14C14.2239 14 14 14.2239 14 14.5C14 14.7761 14.2239 15 14.5 15ZM8.5 11C8.77614 11 9 10.7761 9 10.5C9 10.2239 8.77614 10 8.5 10C8.22386 10 8 10.2239 8 10.5C8 10.7761 8.22386 11 8.5 11ZM9 12.5C9 12.7761 8.77614 13 8.5 13C8.22386 13 8 12.7761 8 12.5C8 12.2239 8.22386 12 8.5 12C8.77614 12 9 12.2239 9 12.5ZM8.5 15C8.77614 15 9 14.7761 9 14.5C9 14.2239 8.77614 14 8.5 14C8.22386 14 8 14.2239 8 14.5C8 14.7761 8.22386 15 8.5 15ZM11 14.5C11 14.7761 10.7761 15 10.5 15C10.2239 15 10 14.7761 10 14.5C10 14.2239 10.2239 14 10.5 14C10.7761 14 11 14.2239 11 14.5ZM12.5 15C12.7761 15 13 14.7761 13 14.5C13 14.2239 12.7761 14 12.5 14C12.2239 14 12 14.2239 12 14.5C12 14.7761 12.2239 15 12.5 15Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                Copy
            </Option>
            <Option label="⌘X" onClick={() => {
                cutEvent();
                showing = false;
            }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.949988 4.48455C0.949988 5.34059 1.64395 6.03455 2.49999 6.03455C3.35603 6.03455 4.04999 5.34059 4.04999 4.48455C4.04999 3.6285 3.35603 2.93455 2.49999 2.93455C1.64395 2.93455 0.949988 3.6285 0.949988 4.48455ZM2.49999 6.93455C1.14689 6.93455 0.0499878 5.83764 0.0499878 4.48455C0.0499878 3.13145 1.14689 2.03455 2.49999 2.03455C3.85309 2.03455 4.94999 3.13145 4.94999 4.48455C4.94999 4.80813 4.88726 5.11707 4.77329 5.39985L5.73655 6.04413C5.72943 6.06656 5.72269 6.08914 5.71635 6.11188L5.56288 6.66186L5.21005 6.89773L4.21554 6.23366C3.77357 6.6672 3.168 6.93455 2.49999 6.93455ZM0.949991 10.5C0.949991 9.64394 1.64395 8.94998 2.49999 8.94998C3.35603 8.94998 4.04999 9.64394 4.04999 10.5C4.04999 11.356 3.35603 12.05 2.49999 12.05C1.64395 12.05 0.949991 11.356 0.949991 10.5ZM2.49999 8.04998C1.14689 8.04998 0.0499908 9.14688 0.0499908 10.5C0.0499908 11.8531 1.14689 12.95 2.49999 12.95C3.85309 12.95 4.94999 11.8531 4.94999 10.5C4.94999 10.1803 4.88877 9.87497 4.77743 9.595L15 2.75737L14.0486 2.85737C12.7077 2.9983 11.4091 3.40895 10.231 4.06461L7.15646 5.77564C6.92307 5.90553 6.75134 6.12339 6.67955 6.38066L6.42653 7.28737L4.22437 8.75957C3.78166 8.32091 3.17246 8.04998 2.49999 8.04998ZM7.14435 9.2149L7.15646 9.22176L10.231 10.9328C11.4091 11.5884 12.7077 11.9991 14.0486 12.14L15 12.24L8.81072 8.1003L7.14435 9.2149Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
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
        background: #472422;
    }

    main.red > p {
        color: rgba(249, 84, 72, 0.6);
    }

    main.red > div.side-color {
        background: #f95448;
    }

    main.orange {
        background: #462E20;
    }

    main.orange > p {
        color: rgba(237, 119, 61, 0.6);
    }

    main.orange > div.side-color {
        background: #ed773d;
    }

    main.yellow {
        background: #4A3E23;
    }

    main.yellow > p {
        color: rgba(244, 190, 64, 0.6);
    }

    main.yellow > div.side-color {
        background: #f4be40;
    }

    main.green {
        background: #254134;
    }

    main.green > p {
        color: rgba(102, 204, 138, 0.6);
    }

    main.green > div.side-color {
        background: #66cc8a;
    }

    main.blue {
        background: #253A45;
    }

    main.blue > p {
        color: rgba(76, 168, 223, 0.6);
    }

    main.blue > div.side-color {
        background: #4ca8df;
    }

    main.purple {
        background: #36284A;
    }

    main.purple > p {
        color: rgba(150, 92, 245, 0.8);
    }

    main.purple > div.side-color {
        background: #965cf5;
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