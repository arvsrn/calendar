<script lang="ts">
    import { onMount } from "svelte";

    import Viewport from "./Viewport.svelte";
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
    import { app, incrementViewportDays } from "../core";
    import SettingsMenu from "./SettingsMenu.svelte";
    import { getVelocity } from "../engine";

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let width: string = "";
    let viewport: HTMLElement;

    let lastScrollLeft = 0;
    let lastScrollTime = Date.now();
    let start = Date.now();

    let currentYear = new Date(start).getUTCFullYear();
    let currentMonth = months[new Date(start).getUTCMonth()];

    app.subscribe(value => {
        width = value.showingSidebar ? `calc(100% - 271px)` : '100%';
    });

    const resetDay = () => start = Date.now() - 1 * 60 * 60 * 24 * 1000;

    $: start, currentMonth = months[new Date(start + (60*60*24*1000)).getUTCMonth()];
    $: start, currentYear = new Date(start).getUTCFullYear();
</script>

<main>
    <Sidebar></Sidebar>
    <div class="viewport" style:width={width}>
        <Navbar bind:currentMonth={currentMonth} bind:currentYear={currentYear} {resetDay}></Navbar>
        <div class="viewport-inner">
            <!-- preventDefault might cause some bugs lol but it works rn so idc -->
            <div id="viewport" bind:this={viewport} on:scroll|preventDefault={event => {
                let dx = -(lastScrollLeft - viewport.scrollLeft);

                lastScrollLeft = viewport.scrollLeft;
                lastScrollTime = Date.now();

                setTimeout(() => {
                    if (Date.now() - lastScrollTime > 300) {
                        const width = (viewport.scrollWidth - 59) / ($app.viewportDays + 2);
                        viewport.scroll({
                            left: ((viewport.scrollLeft % width) < (width/2)) 
                                ? (viewport.scrollLeft - (viewport.scrollLeft % width)) 
                                : (viewport.scrollLeft + width - (viewport.scrollLeft % width)),
                            top: viewport.scrollTop,
                            behavior: 'smooth',
                        });
                    }
                }, 300);

                const width = (viewport.scrollWidth - 59) / ($app.viewportDays + 2);

                if (viewport.scrollLeft === 0) {
                    viewport.scroll(width, viewport.scrollTop);
                    start -= 1 * 60 * 60 * 24 * 1000;
                } else if (viewport.scrollLeft === viewport.scrollWidth - viewport.clientWidth) {
                    viewport.scroll(width, viewport.scrollTop);
                    start += 1 * 60 * 60 * 24 * 1000;
                }
            }}>
                <TimeBar></TimeBar>
                {#each [...Array($app.viewportDays + 2).keys()] as _, i}
                    <Column 
                        dateObj={new Date(start + (i * 60 * 60 * 24 * 1000))} 
                        date="{days[new Date(start + (i * 60 * 60 * 24 * 1000)).getDay()]} {new Date(start + (i * 60 * 60 * 24 * 1000)).getUTCDate()}"
                    /> 
                {/each}
            </div>
        </div>
    </div>
</main>

<svelte:window on:keypress={(event) => {
    if (event.ctrlKey && (event.code == 'Equal' || event.code == 'Minus')) {
        event.preventDefault();
        const difference = event.code == 'Minus' ? -1 : 1;
        if ($app.viewportDays + difference > 0 && $app.viewportDays + difference <= 9)
            incrementViewportDays(difference);
    }
    else if (event.code.startsWith('Digit')) {
        const number = parseInt(event.key);
        if (number === 0) return;
        const difference = number - $app.viewportDays;
        incrementViewportDays(difference);
    }
    else if (event.code == 'KeyB' && event.ctrlKey)
        $app.showingSidebar = !$app.showingSidebar;
}} />

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
        flex: 1;
        width: 100%;
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

    #viewport {
        width: 100%;
        height: 100%;

        overflow: scroll;

        display: flex;
        flex-direction: row;
    }

    #viewport::-webkit-scrollbar {
        display: none;
    }
</style>