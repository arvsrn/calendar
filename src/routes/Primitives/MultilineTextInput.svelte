<script lang="ts">
    export let value: string = "";
    export let placeholder: string = "";
</script>

<div contenteditable="true" bind:innerText={value} data-placeholder={placeholder}></div>

<style>
    div[contenteditable] {
        width: 100%;
        min-height: 36px;
        height: fit-content;
        
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 16px;

        color: var(--text1);
        
        outline: none;
        background: #232323;
        padding: 10px 10px;
        
        border: 1px solid var(--border2);
        border-radius: 6px;

        transition: box-shadow 0.15s var(--ease),
            border 0.15s var(--ease),
            background var(--ease);
    }

    div[contenteditable]::placeholder {
        color: #7E7E7E;
    }

    div[contenteditable]:hover,
    div[contenteditable]:active,
    div[contenteditable]:focus {
        border: 1.5px solid var(--border2);
        background: #252525;
    }

    div[contenteditable]:empty::before {
        content: attr(data-placeholder);
        color: var(--text2);
        cursor: text;
    }
</style>