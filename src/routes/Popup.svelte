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

        if (translateY > 300)
            onSlideOut();
    };

    const onHandleTouchEnd = (event: TouchEvent) => {
        sliding = false;
        translateY = 0;
    };
</script>

<main bind:this={self} class:transition={!sliding} style:transform="translateY({translateY}px)">
    <div class="drawer-handle" on:touchstart={onHandleTouchStart}></div>
    <slot></slot>
</main>

<svelte:window on:touchend={onHandleTouchEnd} on:touchmove={onHandleTouchMove} />

<style>
    main {
        width: 360px;
        height: fit-content;

        background: #1c1c1c;
        border: 1px solid rgba(0, 0, 0, 0.3);
        border-radius: 12px;

        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 24px;

        animation: 0.2s enter ease-in;
    }

    .transition {
        transition: transform 0.1s ease-in;
    }

    div.drawer-handle {
        display: none;
        margin: 0px auto;

        width: 100px;
        height: 4px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-12px);
    }

    @keyframes enter {
        from {
            transform: translateY(5px);
            opacity: 50%;
        }

        to {
            transform: translateY(0px);
            opacity: 100%;
        }
    }

    @media (hover: none) and (pointer: coarse) {
        main {
            width: 100%;
            border-radius: 12px 12px 0px 0px;
            height: 50vh;
            margin-top: auto;
        }

        div.drawer-handle {
            display: block;
        }
    }
</style>