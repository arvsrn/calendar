<script lang="ts">
    import { addNotification } from "../core";
    import type { CalendarEvent } from "../core";
    import Main from "./DropdownMenu/Main.svelte";
    import Option from "./DropdownMenu/Option.svelte";
    import Event from "./Event.svelte";

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const hoursToMinutes = (hours: number, minutes: number = 0) => hours * 60 + minutes;

    let mouse: [number, number] = [0, 0];
    let showing: boolean = false;

    export let date: string = "";
    export let events: Array<CalendarEvent> = [
        {
            startTime: hoursToMinutes(2),
            endTime: hoursToMinutes(4, 30),
            name: 'Work on Calendar',
            description: "",
            color: "green",
            tasks: [],
        },
        {
            startTime: hoursToMinutes(4, 45),
            endTime: hoursToMinutes(6),
            name: 'Study Physics',
            description: "",
            color: "blue",
            tasks: [],
        }
    ];

    let self: HTMLElement;
    let dragging: boolean = false;
    let dragStartPosition: number = 0;
    let dragEndPosition: number = 0;
    let hovering: boolean = false;
</script>

<main bind:this={self} class:dark={['Sun', 'Sat'].includes(date.split(" ")[0])} on:mouseenter={() => hovering = true} on:mouseleave={() => hovering = false}>
    <!-- TODO: make active class for current day -->
    <p class="active">{date}</p>

    <div on:contextmenu|preventDefault|self={event => {
        showing = true;
        mouse = [event.clientX, event.clientY];
    }} class="container" on:scroll|preventDefault={() => {}} on:mousedown|self={ev => {
        dragging = true;
        dragStartPosition = ev.clientY + (self.parentElement?.scrollTop || 0) - 78; // 78 is height of navbar
        dragEndPosition = dragStartPosition;
    }}>
        {#each events as event, i}
            <Event
                onDelete={() => {
                    events.splice(i, 1);
                    events = events; // trigger UI re-render
                }}
                startTime={event.startTime} 
                endTime={event.endTime}
                name={event.name}
                description={event.description}
                color={event.color}
            ></Event>
        {/each}

        {#if dragging}
        <div class="new" style:top="{dragStartPosition}px" style:height="{(dragEndPosition - dragStartPosition) - ((dragEndPosition - dragStartPosition) % 15)}px"></div>
        {/if}
        
        {#each [...Array(24).keys()] as i}
        <div class="divider" style:top="{60 * i}px"></div>
        {/each}
    </div>
</main>

{#if showing}
<div style="width:169px;height:fit-content;position:fixed;left:{mouse[0]}px;top:{mouse[1]}px;">
    <Main onClickOutside={() => showing = false}>
        <Option label="⌘V" onClick={() => {
            showing = false;
            navigator.clipboard.readText().then(text => {
                if (text.startsWith('{')) {
                    const event = JSON.parse(text);

                    if (
                        'startTime' in event &&
                        'endTime' in event &&
                        'color' in event &&
                        'name' in event &&
                        'description' in event &&
                        'tasks' in event
                    ) {
                        const difference = event['endTime'] - event['startTime'];
                        event['startTime'] = mouse[1] - 78;
                        event['endTime'] = event['startTime'] + difference;
                        events = [...events, event];

                        addNotification({
                            heading: "Event pasted",
                            description: `"${event.name}"`,
                        });
                    }
                }
            });
        }}>Paste here</Option>
    </Main>
</div>
{/if}

<svelte:window on:mousemove={ev => {
    if (dragging) {
        dragEndPosition += ev.movementY;
    }
}} on:mouseup={() => {
    if (dragging && !((dragEndPosition - dragStartPosition) < 15)) {
        events = [...events, {
            name: 'New Event',
            description: '',
            color: 'gray',
            startTime: dragStartPosition,
            endTime: dragEndPosition,
            tasks: [],
        }];
    } 

    dragging = false;
    dragStartPosition = 0;
    dragEndPosition = 0;
}} on:paste={event => {
    // @ts-ignore
    let text = (event.clipboardData || window.clipboardData).getData("text");

    if (text.startsWith('{') && hovering) {
        const event = JSON.parse(text);

        if (
            'startTime' in event &&
            'endTime' in event &&
            'color' in event &&
            'name' in event &&
            'description' in event &&
            'tasks' in event
        ) {
            events = [...events, event];

            addNotification({
                heading: "Event pasted",
                description: `"${event.name}"`,
            });
        }
    }
}}/>

<style>
    main {
        width: calc((100% - 60px) / var(--viewport-days));
        height: 1468px;

        flex: none;
        position: relative;
        background: #161616;
    }

    main.dark {
        background: #161616;
    }

    main::-webkit-scrollbar,
    div.container::-webkit-scrollbar {
        display: none;
    }

    div.container {
        height: calc(100% - 28px);
        width: 100%;
        padding: 0px 2px;

        position: relative;
        display: flex;
        flex-direction: column;
        gap: 60px;
        
        overflow: hidden;
        border-right: 1px solid rgba(255, 255, 255, 0.05);
    }

    div.new {
        width: 100%;
        position: absolute;
        background: rgba(255, 255, 255, 0.05);
        margin-top: -2px;
        margin-left: -2px;
    }

    div.divider {
        height: 1px;
        width: calc(100% + 4px);
        background: rgba(255, 255, 255, 0.025);
        flex: none;
        position: absolute;
        pointer-events: none;
    }

    p {
        width: 100%;
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
        background: #161616;

        border-bottom: 1px solid rgba(255, 255, 255, 0.025);
        z-index: 6;
    }

    main.dark > p {
        background: #161616;
    }
</style>