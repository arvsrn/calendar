<script lang="ts">
    import { onMount } from "svelte";

    import Calendar from "./Calendar.svelte";
    import Column from "./Column.svelte";
    import EventComponent from "./Event.svelte";
    import DateBar from "./DateBar.svelte";
    import TimeBar from "./TimeBar.svelte";

    const hoursToMinutes = (hours: number, minutes: number = 0) => hours * 60 + minutes;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    /*
    onMount(() => {
        let s1 = document.getElementById('viewport');
        let s2 = document.getElementById('ribbon');
        let s3 = document.getElementById('timebar');

        if (s1 != null && s2 != null) {
            // @ts-ignore
            const select_scroll_1 = (e: Event) => s2.scrollLeft = s1.scrollLeft;
            // @ts-ignore
            const select_scroll_2 = (e: Event) => s1.scrollLeft = s2.scrollLeft;

            s1.addEventListener('scroll', select_scroll_1, false);
            s2.addEventListener('scroll', select_scroll_2, false);
        }

        if (s1 != null && s3 != null) {
            // @ts-ignore
            const select_scroll_1 = (e: Event) => s3.scrollTop = s1.scrollTop;
            // @ts-ignore
            const select_scroll_2 = (e: Event) => s1.scrollTop = s3.scrollTop;

            s1.addEventListener('scroll', select_scroll_1, false);
            s3.addEventListener('scroll', select_scroll_2, false);
        }
    });
    */
</script>

<main>
    <div class="viewport">
        <div class="viewport-inner">
            <Calendar>
                <TimeBar></TimeBar>
                {#each [...Array(30).keys()] as i}
                <Column date="{days[new Date(`4/${i+1}/23`).getDay()]} {i + 1}">
                    <!--
                    <EventComponent 
                        startTime={hoursToMinutes(14)} 
                        endTime={hoursToMinutes(15, 45)}
                    ></EventComponent>
                    -->
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
        flex-direction: column;
        padding: 25px 100px;

        overflow: scroll;
    }

    .viewport {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
    }

    .viewport > .viewport-inner {
        width: 100%;
        height: 100%;
        
        display: flex;
        flex-direction: row;
    }
</style>