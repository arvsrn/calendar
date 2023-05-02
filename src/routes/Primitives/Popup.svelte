<script lang="ts">
    let sliding: boolean = false;
    let self: HTMLElement;
    let translateY: number = 0;

    export let onSlideOut: () => void;
    
    const onHandleTouchStart = (event: TouchEvent) => {
        sliding = true;
    };
    
    const onHandleTouchMove = (event: TouchEvent) => {
        if (!sliding) return;

        translateY = event.targetTouches[0].clientY - self.offsetTop;
        translateY = Math.max(0, translateY);

        if (translateY > 150)
            onSlideOut();
    };

    const onHandleTouchEnd = (event: TouchEvent) => {
        sliding = false;
        translateY = 0;
    };
</script>

<main bind:this={self} class:transition={!sliding} style:transform="translateY({translateY}px)">
    <div class="drawer-handle" on:touchstart={onHandleTouchStart}>
        <div></div>
    </div>
    <slot></slot>
</main>

<svelte:window on:touchend={onHandleTouchEnd} on:touchmove={onHandleTouchMove} />

<style>
    main {
        width: 360px;
        height: fit-content;

        background: #1c1c1c;
        border: 1px solid rgba(255, 255, 255, 0.025);
        border-radius: 12px;
        box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px;

        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 24px;

        animation: 0.15s enter var(--ease);
    }

    .transition {
        transition: transform 0.1s var(--ease);
    }

    div.drawer-handle > div {
        width: 100px;
        height: 4px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.1);
        touch-action: none;
    }
    
    div.drawer-handle {
        width: calc(100% + 48px);
        height: 32px;
        transform: translate(-24px, -24px);
        touch-action: none;
        margin-bottom: -24px;

        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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

    @media (hover: none) and (pointer: coarse) {
        main {
            width: 100%;
            border-radius: 12px 12px 0px 0px;
            height: 70vh;
            margin-top: auto;
        }

        div.drawer-handle {
            display: flex;
        }
    }
</style>