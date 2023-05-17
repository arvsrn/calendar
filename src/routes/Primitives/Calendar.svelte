<script lang="ts">
    export let resetDay: () => void = () => {};

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let currentYear: number = 2023;    
    let currentMonth: number = new Date().getMonth();
    let monthsOfTheYear: Array<Array<boolean>> = [];

    for (const days of monthDays) {
        monthsOfTheYear.push([]);

        for (let i = 0; i < days; i++) 
            monthsOfTheYear[monthsOfTheYear.length - 1].push(false);
    }
    
    let offset = 2;

    const onCurrentMonthUpdate = () => {
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear -= 1;
        }
        else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear += 1;
        }

        offset = new Date(currentYear, currentMonth, 1).getDay();
    };

    $: currentMonth, onCurrentMonthUpdate();
</script>

<div class="calendar-container">
    <div style="width:100%;height:fit-content;display:flex;flex-direction:row;gap:4px;padding:4px;align-items:center;">
        <p style="color:#ededed;font-weight:600;">{monthNames[currentMonth]} {currentYear}</p>
        <div style:margin-left="auto" style="display:flex;flex-direction:row;gap:4px;align-items:center;">
            <button on:click={() => currentMonth -= 1}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.81809 4.18179C8.99383 4.35753 8.99383 4.64245 8.81809 4.81819L6.13629 7.49999L8.81809 10.1818C8.99383 10.3575 8.99383 10.6424 8.81809 10.8182C8.64236 10.9939 8.35743 10.9939 8.1817 10.8182L5.1817 7.81819C5.09731 7.73379 5.0499 7.61933 5.0499 7.49999C5.0499 7.38064 5.09731 7.26618 5.1817 7.18179L8.1817 4.18179C8.35743 4.00605 8.64236 4.00605 8.81809 4.18179Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </button>
            <button on:click={() => currentMonth += 1}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </button>
            <button on:click={() => {
                const date = new Date();
                currentYear = date.getFullYear();
                currentMonth = date.getMonth();
            }}>
                <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 3.5C2.5 3.5 5 3.5 7 3.5C9 3.5 9.5 5.16667 9.5 6V6.5C9.5 7.16667 9.1 8.5 7.5 8.5H6.5M1.5 3.5L4.5 0.5M1.5 3.5L4.5 6.5" stroke="currentColor"/>
                </svg>                
            </button>
        </div>
    </div>
    <main>
        <div class="row">
            <div class="label dark static">Su</div>
            <div class="label dark static">Mo</div>
            <div class="label dark static">Tu</div>
            <div class="label dark static">We</div>
            <div class="label dark static">Th</div>
            <div class="label dark static">Fr</div>
            <div class="label dark static">Sa</div>
        </div>
        {#each [...Array(Math.ceil(monthDays[currentMonth]/7) + 1).keys()] as _, i}
        <div class="row">
            {#if i == 0 && offset} 
                {#each [...Array(offset).keys()] as _, x}
                    <div class="label dark" on:click={() => currentMonth -= 1}>{31 - offset + x}</div>
                {/each}
                {#each [...Array(7-offset).keys()] as _, j}
                    <div class="label">{7 * i + j + 1}</div>
                {/each}
            {:else}
                {#each [...Array(7).keys()] as _, j}
                    {#if ((7 * (i - 1)) + (7 - offset) + j + 1) <= monthDays[currentMonth]}
                        <div class="label">{(7 * (i - 1)) + (7 - offset) + j + 1}</div>
                    {:else}
                        <div class="label dark" on:click={() => currentMonth += 1}>{(7 * i + j + 1) - monthDays[currentMonth]}</div>
                    {/if}
                {/each}
            {/if}
        </div>
        {/each}
    </main>
</div>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 3px;
        width: 100%;
        height: fit-content;
    }

    div.row {
        display: flex;
        flex-direction: row;
        gap: 2px;
    }

    div.label {
        width: 100%;
        aspect-ratio: 1/1;

        font-size: 12px;
        font-family: var(--font-sans);
        font-weight: 400;
        color: white;

        user-select: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        border-radius: 6px;
    }

    div.label.dark {
        color: #7e7e7e;
    }

    div.label.static {
        cursor: default;
        font-weight: 600;
    }

    div.label:not(.static):hover {
        background: rgba(255, 255, 255, 0.05);
    }

    div.label:not(.static).active {
        background: rgba(255, 255, 255, 0.1);
        width: calc(100%);
        font-weight: bold;
    }

    div.calendar-container {
        width: 100%;
        height: fit-content;

        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    button {
        outline: none;
        border: none;
        border-radius: 4px;

        width: 20px;
        height: 20px;

        background: transparent;
        cursor: pointer;
        color: #A0A0A0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    button:hover {
        background: rgba(255, 255, 255, 0.05);
    }
</style>