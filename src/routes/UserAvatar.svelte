<script lang="ts">
    import Main from './DropdownMenu/Main.svelte';
    import Option from './DropdownMenu/Option.svelte';
    import Blanket from './Primitives/Blanket.svelte';
    import SettingsMenu from './Settings.svelte';

    let showing: boolean = false;
    let showingSettingsMenu: boolean = false;
</script>

<main>
    <img on:click={() => showing = true} on:contextmenu|preventDefault={() => showing = true} draggable="false" src="https://api.cron.com/v1/image/https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAGNmyxb6-ovGUY-Ua1JrUBtXxfSOzFdLQWj1lwFrKNU_%3Ds96-c?width=120" alt="">

    {#if showing}
    <div style:width="200px" style:position="absolute" style:top="100%" style:right="0px" style:z-index="297">
        <Main onClickOutside={() => showing = false}>
            <Option label="⌘S" onClick={() => {showingSettingsMenu = true; showing = false;}}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_70_3)">
                    <path d="M4.7552 0.399994L4.6864 0.749594L4.4232 2.02799C4.00992 2.18862 3.62318 2.41058 3.276 2.68639L1.9896 2.25599L1.644 2.14959L1.4648 2.45759L0.579202 3.93839L0.400002 4.24799L0.662402 4.47759L1.6576 5.32399C1.6216 5.54559 1.5752 5.76399 1.5752 5.99679C1.5752 6.22959 1.6216 6.44879 1.6576 6.67039L0.662402 7.51599L0.400002 7.74559L0.579202 8.05439L1.4648 9.53439L1.644 9.84399L1.9896 9.73599L3.276 9.30639C3.6208 9.57679 4.0024 9.80399 4.4232 9.96479L4.6864 11.2432L4.7552 11.5928H7.244L7.3136 11.2432L7.576 9.96479C7.98927 9.80412 8.376 9.58217 8.7232 9.30639L10.0096 9.73599L10.3552 9.84399L10.5352 9.53519L11.42 8.05439L11.6 7.74559L11.3368 7.51599L10.3416 6.66959C10.3784 6.44799 10.424 6.22959 10.424 5.99599C10.424 5.76399 10.3784 5.54479 10.3416 5.32319L11.3368 4.47679L11.6 4.24719L11.42 3.93839L10.5352 2.45839L10.3552 2.14959L10.0096 2.25679L8.7232 2.68639C8.37602 2.41058 7.98929 2.18862 7.576 2.02799L7.3136 0.749594L7.244 0.399994H4.7552Z" stroke="white" stroke-linecap="square" stroke-linejoin="round"/>
                    <path d="M7.6 5.996C7.6 6.42034 7.43143 6.82731 7.13137 7.12737C6.83131 7.42743 6.42435 7.596 6 7.596C5.57566 7.596 5.16869 7.42743 4.86863 7.12737C4.56857 6.82731 4.4 6.42034 4.4 5.996C4.4 5.57165 4.56857 5.16468 4.86863 4.86463C5.16869 4.56457 5.57566 4.396 6 4.396C6.42435 4.396 6.83131 4.56457 7.13137 4.86463C7.43143 5.16468 7.6 5.57165 7.6 5.996Z" stroke="white" stroke-linecap="square" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_70_3">
                    <rect width="12" height="12" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>                    
                Settings
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
        width: fit-content;
        height: fit-content;
        position: relative;
    }

    img {
        width: 24px;
        height: 24px;
        border-radius: 12px;
        cursor: pointer;
        user-select: none;
    }
</style>