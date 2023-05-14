<script lang="ts">
    export let close: () => void;
    
    let selected: number = 0;
    let showingAccounts: boolean = false;
</script>

<main>
    <div class="sidebar">
        <div class="account" on:click={() => showingAccounts = !showingAccounts} on:keydown={() => { /* shut up a11y nobody likes you */ }}>
            <img draggable="false" src="https://api.cron.com/v1/image/https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAGNmyxb6-ovGUY-Ua1JrUBtXxfSOzFdLQWj1lwFrKNU_%3Ds96-c?width=120" alt="">
            <div style="width:fit-content;height:fit-content;display:flex;flex-direction:column;gap:2px">
                <p style="font-size:13px;color:#ededed;font-weight:500;">Aarav</p>
                <p style="font-size:13px;color:#a0a0a0;font-weight:normal">duclit451@gmail.com</p>
            </div>
            <button>
                <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 1L3.5 4L6.5 1" stroke="currentColor"/>
                </svg>     
            </button>           
        </div>

        <div class="divider" style:margin="8px 0px"></div>

        {#if showingAccounts}
        <div class="account" data-animate style:--stagger={1}>
            <img draggable="false" src="https://media.discordapp.net/attachments/1023648332750520341/1107175781827891250/image.png" alt="">
            <div style="width:fit-content;height:fit-content;display:flex;flex-direction:column;gap:2px">
                <p style="font-size:13px;color:#ededed;font-weight:500;">WasTaken_</p>
                <p style="font-size:13px;color:#a0a0a0;font-weight:normal">rams@braun.com</p>
            </div>        
        </div>
        <div class="account" data-animate style:--stagger={2}>
            <img draggable="false" src="https://res.cloudinary.com/read-cv/image/upload/c_fill,h_92,w_92/dpr_1.0/v1/1/profilePhotos/UmuuDwC2ozQnJxRRFIiBSGsMhg62/647f7013-3b34-460e-8fe3-664ab0560d82.jpg?_a=ATO2BAA0" alt="">
            <div style="width:fit-content;height:fit-content;display:flex;flex-direction:column;gap:2px">
                <p style="font-size:13px;color:#ededed;font-weight:500;">Rick</p>
                <p style="font-size:13px;color:#a0a0a0;font-weight:normal">astley@rick.com</p>
            </div>        
        </div>
        {:else}
        <button data-animate style:--stagger={1} on:click={() => selected = 0} class:active={selected === 0}>Account</button>
        <button data-animate style:--stagger={2} on:click={() => selected = 1} class:active={selected === 1}>Calendar</button>
        <button data-animate style:--stagger={3} on:click={() => selected = 2} class:active={selected === 2}>Preferences</button>
        {/if}
    </div>
    <div class="content">
        <nav>
            Settings
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            {selected == 0 ? 'Account' : (selected == 1 ? 'Calendar' : 'Preferences')}
            <button on:click={close}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </button>
        </nav>
        <div class="divider" style:margin="4px 0px"></div>
    </div>
</main>

<style>
    main {
        width: 80vw;
        height: 80vh;
        max-width: 800px;

        background: #1c1c1c;
        border: 1px solid rgba(255, 255, 255, 0.025);
        border-radius: 12px;
        box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px;

        display: flex;
        flex-direction: row;

        animation: 0.15s enter var(--ease);
        overflow: hidden;
    }

    div.sidebar {
        width: 250px;
        height: 100%;
        border-right: 1px solid rgba(255, 255, 255, 0.025);
        flex: none;
    }

    div.content {
        width: 100%;
        height: 100%;
        
        display: flex;
        flex-direction: column;
    }

    div.sidebar > button {
        width: calc(100% - 8px);
        height: 32px;
        
        background: transparent;
        outline: none;
        cursor: pointer;
        border: none;

        display: flex;
        flex-direction: row;
        gap: 8px;
        margin: 4px;
        padding: 0px 12px;
        align-items: center;
        
        font-size: 13px;
        color: #ededed;
        border-radius: 8px;
    }

    button.active {
        background: rgba(255, 255, 255, 0.05) !important;
    }

    div.sidebar > button:hover {
        background: rgba(255, 255, 255, 0.025);
    }

    div.account {
        margin: 4px;
        padding: 8px 12px;
        width: calc(100% - 8px);
        height: fit-content;
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;
        border-radius: 8px;
        cursor: pointer;
        user-select: none;
    }

    div.account:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    div.account, button {
        transition: background 0.15s var(--ease);
    }

    div.account > button, nav > button {
        width: 20px;
        height: 20px;
        margin-left: auto;

        outline: none;
        border: none;
        color: #a0a0a0;    
        cursor: pointer;    

        background: transparent;
        border-radius: 4px;
    }

    div.account > button:hover,
    nav > button:hover {
        color: #ededed;
    }

    nav > button:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    img {
        width: 24px;
        height: 24px;
        border-radius: 12px;
        cursor: pointer;
        user-select: none;
    }

    nav {
        height: 50px;
        padding: 8px 12px;
        margin: 4px;

        font-size: 14px;
        font-weight: 500;
        color: #ededed;

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 2px;
        user-select: none;
    }

    div.divider {
        height: 1px;
        width: calc(100%);
        background: rgba(255, 255, 255, 0.025);
        pointer-events: none;
    }

    @keyframes enter {
        from {
            transform: translateY(5px);
            opacity: 50%;
            box-shadow: none;
        }

        to {
            transform: translateY(0px);
            opacity: 100%;
            box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px;
        }
    }
</style>