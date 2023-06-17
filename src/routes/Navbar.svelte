<script lang="ts">
    import { onMount } from "svelte";
    import { app, incrementViewportDays } from "../core"; 
    import Main from "./DropdownMenu/Main.svelte";
    import Option from "./DropdownMenu/Option.svelte";
    import Button from "./Primitives/Button.svelte";
    import Calendar from "./Primitives/Calendar.svelte";
    import { fade } from "svelte/transition";
    import Blanket from "./Primitives/Blanket.svelte";
    import SettingsMenu from "./Settings.svelte";
  import Tooltip from "./Primitives/Tooltip.svelte";

    onMount(() => {
        incrementViewportDays(0);
        window.addEventListener('resize', _ => incrementViewportDays(0));
    });

    let showingCalendarMenu: boolean = false;
    let showingSettingsMenu: boolean = false;
    let showingDotsMenu: boolean = false;

    export let currentMonth: string;
    export let currentYear: number = 2023;
    export let resetDay: () => void;
    export let setDay: (to: Date) => void;
</script>

<main>
    <Tooltip tooltip="{$app.showingSidebar ? 'Close' : 'Open'} sidebar">
        <button style:margin-right="8px" on:click={() => $app.showingSidebar = !$app.showingSidebar}>
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 0.5H2.5C1.39543 0.5 0.5 1.39543 0.5 2.5V9.5C0.5 10.6046 1.39543 11.5 2.5 11.5H5.5M5.5 0.5H11.5C12.6046 0.5 13.5 1.39543 13.5 2.5V9.5C13.5 10.6046 12.6046 11.5 11.5 11.5H5.5M5.5 0.5V11.5M2 2.5H4M2 4.5H4M2 6.5H4" stroke="currentColor"/>
            </svg>            
        </button>
    </Tooltip>
    <h1>
        {currentMonth} <span>{currentYear}</span> 
        <span>   
            <div class="container">
                <button class="x" on:click={() => showingCalendarMenu = true}>
                    W32
                    <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 0.5L3.5 3.5L6.5 0.5" stroke="var(--text2)"/>
                    </svg>                        
                </button>
                {#if showingCalendarMenu}
                <div style:width="260px" style:position="absolute" style:top="calc(100% + 2px)" style:left="-4px" style:z-index="297">
                    <Main onClickOutside={() => showingCalendarMenu = false} style="background: var(--gray2);">
                        <div style:padding="8px 12px">
                            <Calendar setDay={(to) => {
                                showingCalendarMenu = false;
                                setDay(to);
                            }}></Calendar>
                        </div>
                    </Main>
                </div>
                {/if}
                <Tooltip tooltip="Back to today">
                    <button transition:fade={{ duration: 80 }} on:click={resetDay}>
                        <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 3.5C2.5 3.5 5 3.5 7 3.5C9 3.5 9.5 5.16667 9.5 6V6.5C9.5 7.16667 9.1 8.5 7.5 8.5H6.5M1.5 3.5L4.5 0.5M1.5 3.5L4.5 6.5" stroke="currentColor"/>
                        </svg>
                    </button>
                </Tooltip>
            </div>
        </span>
    </h1>

    <div class="toright" style:gap="4px">
        <div class="relative-container">
            <button style:margin-right="8px" on:click={() => showingDotsMenu = true}>
                <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H2V2H0V0ZM4 0H6V2H4V0ZM10 0H8V2H10V0Z" fill="currentColor"/>
                </svg>
            </button>

            {#if showingDotsMenu}
            <div style:width="200px" style:position="absolute" style:top="100%" style:right="0px" style:z-index="297">
                <Main onClickOutside={() => showingDotsMenu = false}>
                    <Option submenu>
                        Visible days
                        <div style:width="150px" slot="submenu">
                            <Main>
                                <Option label="1" onClick={() => incrementViewportDays(1 - $app.viewportDays)}>1 day</Option>
                                <Option label="2" onClick={() => incrementViewportDays(2 - $app.viewportDays)}>2 days</Option>
                                <Option label="3" onClick={() => incrementViewportDays(3 - $app.viewportDays)}>3 days</Option>
                                <Option label="4" onClick={() => incrementViewportDays(4 - $app.viewportDays)}>4 days</Option>
                                <Option label="5" onClick={() => incrementViewportDays(5 - $app.viewportDays)}>5 days</Option>
                                <Option label="6" onClick={() => incrementViewportDays(6 - $app.viewportDays)}>6 days</Option>
                                <Option label="7" onClick={() => incrementViewportDays(7 - $app.viewportDays)}>7 days</Option>
                            </Main>
                        </div>
                    </Option>
                    <div style="height:1px;width:100%;background:rgba(255, 255, 255, 0.035);margin:4px 0px;"></div>
                    <Option onClick={() => showingSettingsMenu = true}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.977 11.7595 12.928 12.0403 12.6473L12.6464 12.0412C12.9271 11.7604 12.9761 11.3227 12.7644 10.9869L12.1902 10.076C12.3768 9.73688 12.5278 9.37515 12.638 8.99596L13.6879 8.75794C14.0751 8.67015 14.35 8.32601 14.35 7.92897V7.07183C14.35 6.6748 14.0751 6.33065 13.6879 6.24287L12.6381 6.00488C12.528 5.62578 12.3771 5.26414 12.1906 4.92507L12.7648 4.01407C12.9766 3.6782 12.9276 3.2405 12.6468 2.95975L12.0407 2.35366C11.76 2.07292 11.3223 2.02392 10.9864 2.23565L10.0755 2.80989C9.73622 2.62328 9.37437 2.47229 8.99505 2.36209L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 3.81251C5.44724 3.44339 6.05665 3.18424 6.71543 3.06839L7.07095 1.50024H7.92809L8.28355 3.06816C8.94267 3.18387 9.5524 3.44302 10.0794 3.81224L11.4397 2.9547L12.0458 3.56079L11.1882 4.92117C11.5573 5.44798 11.8164 6.0575 11.9321 6.71638L13.5 7.07183V7.92897L11.932 8.28444C11.8162 8.94342 11.557 9.55301 11.1878 10.0798L12.0453 11.4402L11.4392 12.0462L10.0787 11.1886C9.55192 11.5576 8.94241 11.8166 8.28355 11.9323L7.92809 13.5002H7.07095L6.71543 11.932C6.0569 11.8162 5.44772 11.5572 4.92116 11.1883L3.56055 12.046L2.95445 11.4399L3.81213 10.0794C3.4431 9.55266 3.18403 8.94326 3.06825 8.2845L1.50002 7.92897V7.07183L3.06818 6.71632C3.18388 6.05765 3.44283 5.44833 3.81171 4.92165L2.95398 3.561L3.56008 2.95491L4.92053 3.81251ZM9.02496 7.50008C9.02496 8.34226 8.34223 9.02499 7.50005 9.02499C6.65786 9.02499 5.97513 8.34226 5.97513 7.50008C5.97513 6.65789 6.65786 5.97516 7.50005 5.97516C8.34223 5.97516 9.02496 6.65789 9.02496 7.50008ZM9.92496 7.50008C9.92496 8.83932 8.83929 9.92499 7.50005 9.92499C6.1608 9.92499 5.07513 8.83932 5.07513 7.50008C5.07513 6.16084 6.1608 5.07516 7.50005 5.07516C8.83929 5.07516 9.92496 6.16084 9.92496 7.50008Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        Preferences
                    </Option>
                    <Option appearance="danger">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 3V2.5C2.5 1.39543 3.39543 0.5 4.5 0.5H7.5C8.60457 0.5 9.5 1.39543 9.5 2.5V9.5C9.5 10.6046 8.60457 11.5 7.5 11.5H4C3.17157 11.5 2.5 10.8284 2.5 10V10M6.5 6.5H4H1.5M1.5 6.5L3.5 4.5M1.5 6.5L3.5 8.5" stroke="currentColor"/>
                        </svg>                                       
                        Logout
                    </Option>
                </Main>
            </div>
            {/if}
        </div>
    </div>
</main>

{#if showingSettingsMenu}
<Blanket bind:toggle={showingSettingsMenu}>
    <SettingsMenu close={() => showingSettingsMenu = false}></SettingsMenu>
</Blanket>
{/if}

<svelte:window on:keypress={event => {
    if (event.ctrlKey && event.code === 'KeyS') showingSettingsMenu = true;
}} />

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

        background: var(--gray1);

        border-bottom: 1px solid var(--border2);
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
        color: var(--text1);
    }

    h1 > span {
        font-size: 18px;
        font-weight: normal;
        color: var(--text2);
    }

    /* why does this not work???? */ 
    :global(body.light h1 > span > div.container > button.x) {
        border: 1px solid var(--border3);
    }

    h1 > span > div.container > button.x {
        width: fit-content;
        height: fit-content;
        padding: 3px 7px;
        margin-left: -4px;

        border: 1px solid var(--border2);
        background: transparent;
        border-radius: 6px;
        
        outline: none;
        cursor: pointer;
        user-select: none;

        font-size: 13px;
        font-weight: normal;
        color: var(--text1);
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
        color: var(--text1);
        font-family: var(--font-mono);
        user-select: none;
    }

    div.toright {
        margin-left: auto;

        display: flex;
        flex-direction: row;
        gap: 12px;
        align-items: center;
        justify-content: center;
    }

    button {
        outline: none;
        border: none;
        border-radius: 6px;

        width: 24px;
        height: 24px;

        background: transparent;
        cursor: pointer;
        color: var(--text2);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        transition: background 0.15s var(--ease);
    }

    button:hover, h1 > span > div.container > button:hover {
        background: var(--border2);
    }

    h1 > span > div.container > button:hover {
        border: 1px solid transparent;
    }

    div.divider {
        height: 50px;
        margin: 0px 12px;
        width: 1px;
        background: var(--border2);
        flex: none;
    }

    div.relative-container {
        position: relative;
    }
</style>