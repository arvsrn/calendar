<script lang="ts">
    import { onMount } from "svelte";
    import { app, incrementViewportDays } from "../core"; 
  import UserAvatar from "./UserAvatar.svelte";

    onMount(() => {
        incrementViewportDays(0);
        window.addEventListener('resize', _ => incrementViewportDays(0));
    });
</script>

<main>
    <button style:margin-right="8px" on:click={() => $app.showingSidebar = !$app.showingSidebar}>
        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 0.5H2.5C1.39543 0.5 0.5 1.39543 0.5 2.5V9.5C0.5 10.6046 1.39543 11.5 2.5 11.5H5.5M5.5 0.5H11.5C12.6046 0.5 13.5 1.39543 13.5 2.5V9.5C13.5 10.6046 12.6046 11.5 11.5 11.5H5.5M5.5 0.5V11.5M2 2.5H4M2 4.5H4M2 6.5H4" stroke="currentColor"/>
        </svg>            
    </button>
    <h1>April <span>2023</span></h1>

    <div class="toright">
        <UserAvatar></UserAvatar>
        <button on:click={() => ($app.viewportDays > 1) && incrementViewportDays(-1)}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.81809 4.18179C8.99383 4.35753 8.99383 4.64245 8.81809 4.81819L6.13629 7.49999L8.81809 10.1818C8.99383 10.3575 8.99383 10.6424 8.81809 10.8182C8.64236 10.9939 8.35743 10.9939 8.1817 10.8182L5.1817 7.81819C5.09731 7.73379 5.0499 7.61933 5.0499 7.49999C5.0499 7.38064 5.09731 7.26618 5.1817 7.18179L8.1817 4.18179C8.35743 4.00605 8.64236 4.00605 8.81809 4.18179Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
        <p>{$app.viewportDays}</p>
        <button on:click={() => ($app.viewportDays < 9) && incrementViewportDays(1)}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
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
        flex: none;

        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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

    button:hover {
        background: rgba(255, 255, 255, 0.06);
    }
</style>