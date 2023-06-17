<script lang="ts">
    export let tooltip: string = "";
    export let hovering: boolean = false;
    export let hideIf: boolean = false;

    let self: HTMLElement;
    let tip: HTMLElement;

    let position_x: number = 0;
    let position_y: number = 0;

    $: console.log('x: ', position_x);
    $: console.log('y: ', position_y);
</script>

<main bind:this={self} on:mouseenter={() => {
    tip.classList.add('show');
    position_y = self.offsetTop + self.clientHeight + 2;
    position_x = self.offsetLeft - (tip.clientWidth / 2) + (self.clientWidth / 2);
    tip.classList.remove('show');
    hovering = true;
}} on:mouseleave={() => hovering = false}>
    <slot></slot>
</main>

<div class:show={hovering && !hideIf} bind:this={tip} class="tooltip" style:left="{position_x}px" style:top="{position_y}px">
    <p>{tooltip}</p>
</div>

<style>
    main {
        width: fit-content;
        height: fit-content;
    }

    div.tooltip {
        position: absolute;

        border: 1px solid var(--border2);
        background: var(--gray3);

        display: none;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 6px 8px;

        height: fit-content;
        width: fit-content;

        border-radius: 6px;
        color: var(--text1);

        animation: enter 0.15s var(--ease);
        position: absolute;
        z-index: 504;
    }

    div.tooltip > p {
        width: fit-content;
        white-space: nowrap;
        font-size: 11px;
    }

    div.tooltip.show {
        display: inline-flex;
    }

    @keyframes enter {
        from {
            transform: translateY(5px);
            opacity: 40%;
        }

        to {
            transform: translateY(0px);
            opacity: 100%;
        }
    }
</style>