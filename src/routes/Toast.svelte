<script lang="ts">
    import { slide } from "svelte/transition";
    import { removeNotification, notifications } from "../core";
</script>

<main>
    {#each $notifications as notification, i} 
        {#if $notifications.length - 3 <= i} <!--last 3 elements-->
            <div transition:slide={{ duration: 85 }} class="toast" style="--index:{Math.min($notifications.length - 1, 2) - (Math.min($notifications.length, 3) - ($notifications.length - i))};">
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

    div.toast {
        display: flex;
        flex-direction: column;
        gap: 4px;

        position: relative;

        background-color: #232323;
        border: 1px solid rgba(255, 255, 255, 0.05);
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

        color: #ededed;
    }

    p {
        font-size: 13px;
        font-weight: normal;

        color: #a0a0a0;
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

        color: #a0a0a0;
        transition: background-color 0.15s ease-in-out;

        display: none; 
    }

    div.toast:hover button {
        display: block;
    }

    button:hover {
        color: #ededed;
        background-color: rgba(255, 255, 255, 0.05);
    }
    
    @media only screen and (max-width: 450px) {
        div.toast {
            width: calc(100vw - 48px);
        }
    }
</style>