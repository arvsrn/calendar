<script lang="ts">
    import { onMount } from "svelte";
    import { app, getCompletedTasks } from "../core";
    import Button from "./Primitives/Button.svelte";
    import SidebarCalendar from "./Primitives/Calendar.svelte";
    import TodoTask from "./TodoTask.svelte";
    import TodoTaskProgress from "./TodoTaskProgress.svelte";
    import Blanket from "./Primitives/Blanket.svelte";
    import Calendar from "./Primitives/Calendar.svelte";
    import { fade, slide } from "svelte/transition";

    let viewportWidth: number = 0;
    let percentage: number = Math.floor((getCompletedTasks($app.todaysTasks).length / $app.todaysTasks.length) * 100);
    $: percentage = Math.floor((getCompletedTasks($app.todaysTasks).length / $app.todaysTasks.length) * 100);

    onMount(() => {
        viewportWidth = window.innerWidth;
        window.addEventListener('resize', _ => viewportWidth = window.innerWidth);
    });
</script>

{#if $app.showingSidebar && viewportWidth > 771}
<main transition:slide={{ axis: 'x', duration: 180 }}>
    <div class="container" out:fade={{ duration: 20 }} in:fade={{ duration: 20, delay: 160 }}>
        <nav>
            <h1 style="padding:0px;display:flex;align-items:center;flex-direction:row;gap:5px;">
                Today's Tasks
            </h1>
        </nav>
        
        <section style:margin-top="24px">  
            <!--
                <p>Tasks you've added to events will show up here.</p>
            --> 
    
            {#each $app.todaysTasks as task}
                <TodoTask origin="indirect" bind:done={task.completed}>{@html task.title}</TodoTask>
            {/each}
    
            <TodoTaskProgress bind:percentage={percentage}></TodoTaskProgress>
        </section>
    </div>
</main>
{:else if $app.showingSidebar}
<!--I don't know how to not duplicate this code-->
<Blanket bind:toggle={$app.showingSidebar}>
    <main class="mobile" transition:slide={{ axis: 'x', duration: 180 }} style:margin-right="auto">
        <div class="container" out:fade={{ duration: 20 }} in:fade={{ duration: 20, delay: 160 }}>
            <nav>
                <h1 style="padding:0px;display:flex;align-items:center;flex-direction:row;gap:5px;">
                    Today's Tasks
                </h1>
            </nav>
            
            <section style:margin-top="24px">  
                <!--
                    <p>Tasks you've added to events will show up here.</p>
                --> 
        
                {#each $app.todaysTasks as task}
                    <TodoTask origin="indirect" bind:done={task.completed}>{@html task.title}</TodoTask>
                {/each}
        
                <TodoTaskProgress bind:percentage={percentage}></TodoTaskProgress>
            </section>
        </div>
    </main>
</Blanket>
{/if}

<style>
    nav {
        width: 100%;
        height: 50px;

        border-bottom: 1px solid var(--border2);
    
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;
        padding: 16px;
    }
    
    main {
        width: 271px;
        height: 100vh;
        
        background: var(--gray0);
        border-right: 1px solid var(--border2);

        flex: none;

        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    main.mobile {
        position: absolute;
        left: 0px;
    }

    h1 {
        width: 100%;
        height: fit-content;

        font-size: 14px;
        font-weight: 500;
        font-family: var(--font-sans);
        color: var(--text1);
        line-height: 50px;

        user-select: none;
        padding: 0px 16px;
        margin: 8px 0px;
    }

    nav > h1 {
        margin: 0px !important;
    }

    section {
        width: 100%;
        height: fit-content;

        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 0px 16px;
    }

    p {
        height: fit-content;
        width: 100%;
        word-wrap: break-word;
        font-size: 12px;
        color: var(--text2);
        margin-top: -14px;
    }
</style>