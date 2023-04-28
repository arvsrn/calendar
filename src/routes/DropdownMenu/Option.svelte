<script lang="ts">
    export let label: string = "";
</script>

<main>
    <slot></slot>

    {#if label}
        <p>{label}</p>
    {/if}
</main>

<style>
    main {
        width: 100%;
        height: 32px;

        background: transparent;

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;
        padding: 0px 12px;

        cursor: pointer;

        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 12.5px;
        color: #ededed;
    }

    main:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    main > p {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 12.5px;
        color: #a0a0a0;
        margin-left: auto;
    }
</style>