<script lang="ts">
    import { fade } from "svelte/transition";
  import Blanket from "./Primitives/Blanket.svelte";
  import Shortcut from "./Shortcut.svelte";
  
    export let close: () => void;

    const enum Tab {
        Profile = "Profile",
        General = "General",
        Appearance = "Appearance",
        Shortcuts = "Shortcuts",
        InviteFriends = "Invite Friends",
        Changelog = "Changelog",
    }
    
    let selected: Tab = Tab.Shortcuts;
    let showingAccountSettings: boolean = false;
</script>

<main>
    <button class="close" on:click={close}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    </button>

    <section class="sidebar">
        <p>User settings</p>
        <button class:active={selected === Tab.Profile} on:click={() => selected = Tab.Profile}>Profile</button>

        <div class="divider"></div>

        <p>App settings</p>
        <button class:active={selected === Tab.General} on:click={() => selected = Tab.General}>General</button>
        <button class:active={selected === Tab.Appearance} on:click={() => selected = Tab.Appearance}>Appearance</button>
        <button class:active={selected === Tab.Shortcuts} on:click={() => selected = Tab.Shortcuts}>Shortcuts</button>

        <div class="divider"></div>

        <button class:active={selected === Tab.InviteFriends} on:click={() => selected = Tab.InviteFriends}>Invite friends</button>
        <button class:active={selected === Tab.Changelog} on:click={() => selected = Tab.Changelog}>Changelog</button>

        <div class="divider"></div>

        <div class="account" on:click={() => showingAccountSettings = !showingAccountSettings} on:keydown={() => {/*bruv a11y*/}}>
            <img draggable="false" src="https://res.cloudinary.com/read-cv/image/upload/c_fill,h_92,w_92/dpr_1.0/v1/1/profilePhotos/UmuuDwC2ozQnJxRRFIiBSGsMhg62/647f7013-3b34-460e-8fe3-664ab0560d82.jpg?_a=ATO2BAA0" alt="">
            <div style="width:fit-content;height:fit-content;display:flex;flex-direction:column;gap:2px;">
                <p style="font-size:13px;color:var(--text1);font-weight:500;margin:0px !important;">Deiter Rams</p>
                <p style="font-size:13px;color:var(--text2);font-weight:normal;margin:0px !important;">rams@braun.com</p>
            </div>
        </div>

        {#if showingAccountSettings}
        <div out:fade={{ duration: 100 }} class="account" data-animate style:--stagger={1.0} on:click={() => showingAccountSettings = !showingAccountSettings} on:keydown={() => {/*bruv a11y*/}}>
            <img draggable="false" src="https://api.cron.com/v1/image/https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAGNmyxb6-ovGUY-Ua1JrUBtXxfSOzFdLQWj1lwFrKNU_%3Ds96-c?width=120" alt="">
            <div style="width:fit-content;height:fit-content;display:flex;flex-direction:column;gap:2px;">
                <p style="font-size:13px;color:var(--text1);font-weight:500;margin:0px !important;">Starman</p>
                <p style="font-size:13px;color:var(--text2);font-weight:normal;margin:0px !important;">starman@aarv.me</p>
            </div>
        </div>
        <button out:fade={{ duration: 100 }} data-animate style:--stagger={1.5}>Add account</button>
        <button class="danger" out:fade={{ duration: 100 }} data-animate style:--stagger={2.0}>Log out</button>
        <button class="danger" out:fade={{ duration: 100 }} data-animate style:--stagger={2.5}>Delete this account</button>
        {/if}
    </section>
    <section class="content">
        <h1>{selected}</h1>
        {#if selected === Tab.Shortcuts}
        <div style="display:flex;flex-direction:column;gap:16px;">
            <div style="display:flex;flex-direction:row;width:100%;align-items:center;">
                <p class="text" style:width="60%">Open/close sidebar</p>
                <Shortcut>ctrl b</Shortcut>
            </div>
            <div style="display:flex;flex-direction:row;width:100%;align-items:center;">
                <p class="text" style:width="60%">Open settings menu</p>
                <Shortcut>ctrl s</Shortcut>
            </div>
            <div style="display:flex;flex-direction:row;width:100%;align-items:center;">
                <p class="text" style:width="60%">Increment days in viewport</p>
                <Shortcut>ctrl +</Shortcut>
            </div>
            <div style="display:flex;flex-direction:row;width:100%;align-items:center;">
                <p class="text" style:width="60%">Decrement days in viewport</p>
                <Shortcut>ctrl -</Shortcut>
            </div>
            <div style="display:flex;flex-direction:row;width:100%;align-items:center;">
                <p class="text" style:width="60%">Set days in viewport</p>
                <Shortcut>ctrl 1-9</Shortcut>
            </div>
        </div>
        {/if}
    </section>
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;

        display: flex;
        flex-direction: row;

        background: var(--gray0);
    }

    p {
        font-size: 11px;
        font-weight: 500;
        color: var(--text2);
        width: 164px;
        margin-bottom: 8px;
    }

    p.text {
        margin: 0px !important;
        font-size: 14px;
        color: var(--text1);
        user-select: text;
        font-weight: normal;
        width: 100%;
    }

    section.sidebar > div.divider {
        width: calc(176px - 24px);
        height: 1px;
        background: var(--border2);
        margin: 12px 0px;
        margin-right: 12px;
    }

    section.content > div.divider {
        width: 100%;
        height: 1px;
        background: var(--border2);
        margin: 12px 0px;
    }

    section {
        display: flex;
        flex-direction: column;
        padding: 64px 24px;
    }

    section.sidebar {
        width: 35vw;
        height: 100%;
        border-right: 1px solid var(--border2);
        align-items: flex-end;
        gap: 4px;
    }

    section.content {
        width: 65vw;
        height: 100%;
        background: var(--gray1);
        padding: 64px;
        gap: 8px;
    }

    div.account {
        padding: 8px 12px;
        width: 176px;
        height: fit-content;
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;
        border-radius: 8px;
        cursor: pointer;
        user-select: none;
        transition: background 0.15s var(--ease);
    }

    div.account:hover {
        background: var(--border3);
    }

    img {
        width: 24px;
        height: 24px;
        user-select: none;
        border-radius: 12px;
    }

    button {
        width: 176px;
        height: 32px;
        
        background: transparent;
        outline: none;
        cursor: pointer;
        border: none;

        display: flex;
        flex-direction: row;
        gap: 8px;
        padding: 0px 12px;
        align-items: center;
        user-select: none;
        
        font-size: 13px;
        font-weight: 450;
        color: var(--text2);
        border-radius: 8px;

        transition: background 0.15s var(--ease), color 0.15s var(--ease);
    }

    button.danger {
        color: rgb(252, 79, 79);
    }

    button.danger:hover {
        color: rgb(252, 79, 79);
    }

    button:hover, .active {
        color: var(--text1);
        background: var(--border3);
    }

    button.close {
        position: absolute;
        right: 64px;
        top: 64px;

        width: 40px;
        height: 40px;
        background: var(--border2);
        color: var(--text2);
        border-radius: 20px;

        align-items: center;
        justify-content: center;
        padding: 0px;
    }

    button.close:hover {
        background: var(--border3);
        color: var(--text1);
    }

    button.close > svg {
        flex: none;
    }

    h1, h2 {
        font-size: 18px;
        font-weight: 500;
        color: var(--text1);
    }

    h1 {
        margin-bottom: 16px;
    }

    h2 {
        margin-bottom: 8px;
        font-size: 14px;
    }

    p, h1, h2 {
        user-select: none;
    }
</style>