<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import { removeNotification, notifications } from "../core";

    let hovering: boolean = false;
</script>

<main on:mouseenter={() => hovering = true} on:mouseleave={() => hovering = false}>
    {#if $notifications.length > 0 && hovering}
    <button transition:fade={{ duration: 200 }} on:click={() => notifications.set([])}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        Clear
    </button>
    {/if}
    {#each $notifications as notification, i} 
        {#if $notifications.length - 3 <= i} <!--last 3 elements-->
            <div transition:slide={{ duration: 120 }} class="toast" style="--index:{Math.min($notifications.length - 1, 2) - (Math.min($notifications.length, 3) - ($notifications.length - i))};">
                <h1>{notification.heading}</h1>
                {#if notification.description}
                    <p>{notification.description}</p>
                {/if}

                <div style="position:absolute;height:100%;aspect-ratio:1/1;right:0px;top:0px;display:flex;align-items:center;justify-content:center;">
                    <button on:click={() => removeNotification(i)}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
        {/if}
    {/each}
</main>

<style>
    main {
        width: 350px;
        height: fit-content;

        position: absolute;
        bottom: 24px;
        right: 24px;

        display: flex;
        flex-direction: column;
        gap: 8px;
        z-index: 10;
    }

    main > button {
        padding: 0px;
        background: transparent;
        color: var(--text2);
        font-weight: 500;
        width: fit-content;
        height: fit-content;
        margin-left: auto;
        margin-right: 12px;
    }

    main:hover > button {
        display: flex;
    }

    main > button:hover {
        background: transparent;
    }

    div.toast {
        display: flex;
        flex-direction: column;
        gap: 4px;

        position: relative;

        background-color: var(--gray3);
        border: 1px solid var(--border2);
        box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px;
        border-radius: 8px;

        padding: 16px;
        height: fit-content;
        width: 100%;

        transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
    }

    main:not(:hover) div.toast {
        transform: translateY(calc(105% * var(--index))) scale(calc(-1 * var(--index) * 0.05 + 1));
        opacity: calc(1 - (var(--index) - 2));
    }

    main:not(:hover) {
        gap: 16px;
    }

    p, h1 {
        user-select: text;
        cursor: default;
    }

    h1 {
        font-size: 13px;
        font-weight: 500;

        color: var(--text1);
    }

    p {
        font-size: 13px;
        font-weight: normal;

        color: var(--text2);
    }

    button {
        background-color: transparent;
        border-radius: 8px;

        border: none;
        outline: none;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 32px;
        height: 32px;

        color: var(--text2);
        transition: background-color 0.15s ease-in-out;

        display: none; 
    }

    div.toast:hover button {
        display: block;
    }

    button:hover {
        color: var(--text1);
        background-color: var(--border2);
    }
    
    @media only screen and (max-width: 450px) {
        div.toast {
            width: calc(100vw - 48px);
        }
    }
</style>