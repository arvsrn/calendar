<script lang="ts">
    import { fade, slide } from "svelte/transition";
    
    export function clickOutside(
        node: HTMLElement,
        handler: () => void
    ): { destroy: () => void } {
        const onClick = (event: MouseEvent) =>
            node &&
            !node.contains(event.target as HTMLElement) &&
            !event.defaultPrevented &&
            handler();

            document.addEventListener('click', onClick, true);
            document.addEventListener('contextmenu', onClick, true);

        return {
            destroy() {
                document.removeEventListener('click', onClick, true);
                document.removeEventListener('contextmenu', onClick, true);
            },
        };
    }

    export let onClickOutside: () => void = () => {};
    export let fixedHeight: string | null = null;
    export let style: string = "";
</script>

<main class:scroll={fixedHeight} style={fixedHeight ? `height: ${fixedHeight}; ${style}` : style} out:fade={{ duration: 150 }} use:clickOutside={onClickOutside}>
    <slot></slot>
</main>

<style>
    main {
        overflow: visible;
        outline: none;
        background: var(--gray3);
        
        border: 1px solid var(--border1);
        box-shadow: 0px 13px 5px rgba(0, 0, 0, 0.01), 
            0px 7px 4px rgba(0, 0, 0, 0.05), 
            0px 3px 3px rgba(0, 0, 0, 0.09), 
            0px 1px 2px rgba(0, 0, 0, 0.1), 
            0px 0px 0px rgba(0, 0, 0, 0.1);
        border-radius: 6px;

        width: 100%;
        height: fit-content;
        padding: 4px 0px;

        display: flex;
        flex-direction: column;

        animation: enter 0.15s var(--ease) 1;
        z-index: 101;
        cursor: default;
    }

    main.scroll {
        overflow: scroll;
    }

    @keyframes enter {
        0% {
            transform: translateY(-6px);
            opacity: 40%;  
            box-shadow: none;
        }

        100% {
            transform: translateY(0px);
            opacity: 100%;
            box-shadow: 0px 13px 5px rgba(0, 0, 0, 0.01), 
                0px 7px 4px rgba(0, 0, 0, 0.05), 
                0px 3px 3px rgba(0, 0, 0, 0.09), 
                0px 1px 2px rgba(0, 0, 0, 0.1), 
                0px 0px 0px rgba(0, 0, 0, 0.1);
        }
    }
</style>