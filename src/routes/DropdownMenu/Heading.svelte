<h1>
    <slot></slot>
</h1>

<style>
    h1 {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 11px;
        line-height: 13px;
        letter-spacing: 0.025em;

        color: #7E7E7E;
        padding: 0px 12px;
        margin: 8px 0px;

        user-select: none;

        width: calc(100% - 17px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>