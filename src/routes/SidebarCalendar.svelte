<script lang="ts">
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const percentages: number[] = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
    let currentMonth: number = new Date().getMonth();
    let monthsOfTheYear: Array<Array<boolean>> = [];

    for (const days of monthDays) {
        monthsOfTheYear.push([]);

        for (let i = 0; i < days; i++) 
            monthsOfTheYear[monthsOfTheYear.length - 1].push(false);
    }
    
    let offset = 2;

    const updatePercentage = () => {
        const total = monthsOfTheYear[currentMonth].length;
        const daysOff = monthsOfTheYear[currentMonth].filter(n => n).length;

        percentages[currentMonth] = Math.round(100.0 - ((daysOff/total) * 100));
    };

    const onCurrentMonthUpdate = () => {
        if (currentMonth < 0) currentMonth = 0;
        else if (currentMonth > 11) currentMonth = 11;

        const date = new Date();
        offset = new Date(date.getFullYear(), currentMonth, 1).getDay() - 1;
    };

    $: currentMonth, onCurrentMonthUpdate()
    $: monthsOfTheYear[currentMonth], updatePercentage()
</script>

<main>
    <div class="row">
        <div class="label darker">Mon</div>
        <div class="label darker">Tue</div>
        <div class="label darker">Wed</div>
        <div class="label darker">Thu</div>
        <div class="label darker">Fri</div>
        <div class="label darker">Sat</div>
        <div class="label darker">Sun</div>
    </div>
    <div class="main">
        {#if offset > 0}
            {#each [...Array(offset).keys()] as i}
                <div class="label"></div>
            {/each}
        {/if}
        {#each monthsOfTheYear[currentMonth] as day, i}
            <button on:click={() => monthsOfTheYear[currentMonth][i] = !monthsOfTheYear[currentMonth][i]} class:enabled={monthsOfTheYear[currentMonth][i]}>{i + 1}</button>
        {/each}
    </div>
</main>

<style>
    main {
        width: 100%;
        height: fit-content;

        display: flex;
        flex-direction: column;
        gap: 8px;

        position: relative;
    }

    div.row {
        display: flex;
        flex-direction: row;
        width: 248px;
        gap: 2px;
    }

    div.label {
        aspect-ratio: 1/1;

        color: #ededed;
        font-weight: 400;
        font-size: 12px;
        font-family: var(--font-mono);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;

        user-select: none;
    }

    div.darker {
        color: #707070 !important;
    }

    div.main {
        width: 248px;
        height: fit-content;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 4px;
    }

    button {
        height: 32px;
        width: 32px;

        color: #ededed;
        font-weight: 600;
        font-size: 13px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: none;

        background: transparent;
        border: none;
        outline: none;
        border-radius: 4px;
        cursor: pointer;

        user-select: none;
    }

    button.enabled {
        background: rgba(255, 125, 19, 0.25);
    }
</style>