<script lang="ts">
    export let appearance: 'primary' | 'secondary' | 'success' | 'danger' | 'link';
    export let size: 'default' | 'large' = 'default';

    export let onClick: () => void = () => {};
</script>

<button class="{appearance} {size}" on:click={onClick}>
    <slot></slot>
</button>

<style>
    button {
        box-sizing: border-box;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 4px;

        outline: none;
        cursor: pointer;
        border-radius: 6px;

        font-family: var(--font-sans);
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        
        color: #EDEDED;
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.27);
        user-select: none;
        border: none;
        border: 1px solid #000000;

        transition: background 0.15s cubic-bezier(.26,.68,.12,.98),
            transform 0.15s cubic-bezier(.26,.68,.12,.98);
    }

    button:active {
        transform: scale(0.97);
    }

    /* Button color styles */

    button.primary {
        background: #0091FF;
        box-shadow: inset 0px -1px 2px rgba(0, 0, 0, 0.7), 
            inset 0px 0.5px 1px rgba(255, 255, 255, 0.5);
    }

    button.primary:hover {
        background: #369EFF;
    }

    button.secondary {
        background: #232323;
        box-shadow: 0px 13px 5px rgba(0, 0, 0, 0.01), 
            0px 7px 4px rgba(0, 0, 0, 0.05), 
            0px 3px 3px rgba(0, 0, 0, 0.09), 
            0px 1px 2px rgba(0, 0, 0, 0.1), 
            0px 0px 0px rgba(0, 0, 0, 0.1),
            inset 0px -1px 1px rgba(0, 0, 0, 0.1), 
            inset 0px 1px 1px rgba(255, 255, 255, 0.1);
    }

    button.secondary:hover {
        background: #282828;
    }

    button.danger {
        background: #DC3D43;
        box-shadow: inset 0px -1px 1px rgba(0, 0, 0, 0.7), 
            inset 0px 1px 1px rgba(255, 255, 255, 0.3);
    }

    button.danger:hover {
        background: #E5484D; 
    }

    button.success {
        background: #46A758;
        box-shadow: inset 0px -1px 4px rgba(0, 0, 0, 0.25), 
            inset 0px 1px 1px rgba(255, 255, 255, 0.65);
    }

    button.success:hover {
        background: #55B467; 
    }

    button.link {
        background: transparent;
        border: 1px solid transparent;   
    }

    button.link:hover {
        background: #282828;
    }

    /* Button sizes */
    
    button.default {
        padding: 7px 16px;
        width: fit-content;
        height: 30px;
    }

    button.large {
        padding: 7px 16px;
        width: fit-content;
        height: 36px;
    }
</style>