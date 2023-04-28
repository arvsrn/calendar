<script lang="ts">
    import Button from "./Button.svelte";
    import SidebarCalendar from "./SidebarCalendar.svelte";
    import TodoTask from "./TodoTask.svelte";
    import TodoTaskProgress from "./TodoTaskProgress.svelte";

    let percentage: number = 0;
    let taskStates: boolean[] = [false, false, false];
    $: percentage = Math.floor(taskStates.filter(e => e).length/3 * 100);
</script>

<main>
    <h1>Today's Tasks</h1>
    <section>
        <TodoTask bind:done={taskStates[0]}>I am the biggest fard on the planet.</TodoTask>
        <TodoTask bind:done={taskStates[1]}><b>Complete</b> the <i>calendar</i> app.</TodoTask>
        <TodoTask bind:done={taskStates[2]}>Do something big, presumably shit in the toilet.</TodoTask>
        <TodoTaskProgress bind:percentage={percentage}></TodoTaskProgress>
    </section>
</main>

<style>
    main {
        width: 271px;
        height: 100vh;
        
        background: #1c1c1c;
        border-right: 1px solid rgba(255, 255, 255, 0.05);

        flex: none;

        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    h1 {
        width: 100%;
        height: 50px;

        font-size: 17px;
        font-weight: 600;
        font-family: var(--font-sans);
        color: #ededed;
        line-height: 50px;

        user-select: none;
        padding: 0px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    section {
        width: 100%;
        height: fit-content;

        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 16px;
    }
</style>