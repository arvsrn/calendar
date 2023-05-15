<script lang="ts">
    import { onMount } from "svelte";
    import { app, incrementViewportDays } from "../core"; 
    import UserAvatar from "./UserAvatar.svelte";
    import Main from "./DropdownMenu/Main.svelte";
    import Option from "./DropdownMenu/Option.svelte";
    import Button from "./Primitives/Button.svelte";
    import Calendar from "./Primitives/Calendar.svelte";
    import { fade } from "svelte/transition";
    import Blanket from "./Primitives/Blanket.svelte";
    import SettingsMenu from "./SettingsMenu.svelte";

    onMount(() => {
        incrementViewportDays(0);
        window.addEventListener('resize', _ => incrementViewportDays(0));
    });

    let showingCalendarMenu: boolean = false;
    let showingSettingsMenu: boolean = false;
    export let currentMonth: string;
    export let currentYear: number = 2023;
</script>

<main>
    <h1>
        {currentMonth} <span>{currentYear}</span> 
        <span>   
            <div class="container">
                <button class="x" on:click={() => showingCalendarMenu = true}>
                    W32
                    <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 0.5L3.5 3.5L6.5 0.5" stroke="#a0a0a0"/>
                    </svg>                        
                </button>
                {#if showingCalendarMenu}
                <div style:width="260px" style:position="absolute" style:top="calc(100% + 2px)" style:left="-4px" style:z-index="297">
                    <Main onClickOutside={() => showingCalendarMenu = false} style="background: #1c1c1c;">
                        <div style:padding="8px 12px">
                            <Calendar></Calendar>
                        </div>
                    </Main>
                </div>
                {:else}
                <button transition:fade={{ duration: 80 }}>
                    <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 3.5C2.5 3.5 5 3.5 7 3.5C9 3.5 9.5 5.16667 9.5 6V6.5C9.5 7.16667 9.1 8.5 7.5 8.5H6.5M1.5 3.5L4.5 0.5M1.5 3.5L4.5 6.5" stroke="currentColor"/>
                    </svg>                
                </button>
                {/if}
            </div>
        </span>
    </h1>

    <div class="toright">
        <UserAvatar></UserAvatar>
        <div class="divider"></div>
        <button on:click={() => ($app.viewportDays > 1) && incrementViewportDays(-1)}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.81809 4.18179C8.99383 4.35753 8.99383 4.64245 8.81809 4.81819L6.13629 7.49999L8.81809 10.1818C8.99383 10.3575 8.99383 10.6424 8.81809 10.8182C8.64236 10.9939 8.35743 10.9939 8.1817 10.8182L5.1817 7.81819C5.09731 7.73379 5.0499 7.61933 5.0499 7.49999C5.0499 7.38064 5.09731 7.26618 5.1817 7.18179L8.1817 4.18179C8.35743 4.00605 8.64236 4.00605 8.81809 4.18179Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
        <p>{$app.viewportDays}</p>
        <button on:click={() => ($app.viewportDays < 9) && incrementViewportDays(1)}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
        <div class="divider"></div>
        <button style:margin-right="8px" on:click={() => $app.showingSidebar = !$app.showingSidebar}>
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 0.5H2.5C1.39543 0.5 0.5 1.39543 0.5 2.5V9.5C0.5 10.6046 1.39543 11.5 2.5 11.5H5.5M5.5 0.5H11.5C12.6046 0.5 13.5 1.39543 13.5 2.5V9.5C13.5 10.6046 12.6046 11.5 11.5 11.5H5.5M5.5 0.5V11.5M2 2.5H4M2 4.5H4M2 6.5H4" stroke="currentColor"/>
            </svg>            
        </button>
        <!--
        <button style:margin-right="8px">
            <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H2V2H0V0ZM4 0H6V2H4V0ZM10 0H8V2H10V0Z" fill="currentColor"/>
            </svg>
        </button>
        -->
    </div>
</main>

<style>
    main {
        width: 100%;
        height: 50px;
        
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px 16px;
        padding-right: 12px;
        flex: none;

        background: #141414;

        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    h1, p, span {
        display: flex;
        flex-direction: row;
        gap: 6px;
        align-items: center;
    }
    
    h1 {
        font-size: 18px;
        font-weight: 600;
        color: #ededed;
    }

    h1 > span {
        font-size: 18px;
        font-weight: normal;
        color: #a0a0a0;
    }

    h1 > span > div.container > button.x {
        width: fit-content;
        height: fit-content;
        padding: 3px 7px;
        margin-left: -4px;

        border: 1px solid rgba(255, 255, 255, 0.075);
        background: transparent;
        border-radius: 6px;
        
        outline: none;
        cursor: pointer;
        user-select: none;

        font-size: 13px;
        font-weight: normal;
        color: #ededed;
        transition: background 0.1s var(--ease);

        display: flex;
        flex-direction: row;
        gap: 6px;
        align-items: center;

        margin-left: 4px;
    }

    /* hardcoded to center (visually) because css hates me */
    h1 > span > div.container > button > svg {
        transform: translateY(1px);
    }

    div.container {
        width: fit-content;
        height: fit-content;
        position: relative;

        display: flex;
        flex-direction: row;
        gap: 6px;
        align-items: center;
    }

    p {
        font-size: 14px;
        color: #ededed;
        font-family: var(--font-mono);
        user-select: none;
    }

    div.toright {
        margin-left: auto;

        display: flex;
        flex-direction: row;
        gap: 6px;
        align-items: center;
        justify-content: center;
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

    button:hover, h1 > span > div.container > button:hover {
        background: rgba(255, 255, 255, 0.06);
    }

    h1 > span > div.container > button:hover {
        border: 1px solid transparent;
    }

    div.divider {
        height: 50px;
        margin: 0px 12px;
        width: 1px;
        background: rgba(255, 255, 255, 0.05);
        flex: none;
    }
</style>