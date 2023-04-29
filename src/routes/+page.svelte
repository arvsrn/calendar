<script lang="ts">
    import { onMount } from "svelte";

    import Calendar from "./Viewport.svelte";
    import Column from "./Column.svelte";
    import EventComponent from "./Event.svelte";
    import TimeBar from "./TimeBar.svelte";
    import Sidebar from "./Sidebar.svelte";
    import Navbar from "./Navbar.svelte";
    import Blanket from "./Primitives/Blanket.svelte";
    import Popup from "./Primitives/Popup.svelte";
    import Button from "./Primitives/Button.svelte";
    import TextInput from "./Primitives/TextInput.svelte";
    import EditTask from "./Popups/EditTask.svelte";
    import DeleteTask from "./Popups/DeleteTask.svelte";
    import { app } from "../core";

    const hoursToMinutes = (hours: number, minutes: number = 0) => hours * 60 + minutes;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let width: string = "";

    app.subscribe(value => {
        width = value.showingSidebar ? `calc(100% - 271px)` : '100%';
    });
</script>

<main>
    <Sidebar></Sidebar>
    <div class="viewport" style:width={width}>
        <Navbar></Navbar>
        <div class="viewport-inner">
            <Calendar>
                <TimeBar></TimeBar>
                {#each [...Array(30).keys()] as i}
                <Column date="{days[new Date(`4/${i+1}/23`).getDay()]} {i + 1}">
                    <EventComponent 
                        startTime={hoursToMinutes(14)} 
                        endTime={hoursToMinutes(15, 45)}
                    ></EventComponent>
                </Column>
                {/each}
            </Calendar>
        </div>
    </div>
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;
        
        display: flex;
        flex-direction: row;

        overflow: auto;
    }

    .viewport {
        height: calc(100vh - 50px);

        display: flex;
        flex-direction: column;
    }

    .viewport > .viewport-inner {
        width: 100%;
        height: 100%;
        
        display: flex;
        flex-direction: row;
    }

    @media only screen and (max-width: 500px) {
        .viewport {
            width: 100%;
        }
    }
</style>