<script lang="ts">
    export let label: string = "";
    export let placeholder: string = "";
    export let id: string = "";
    export let value: string = "";
    export let state: 'normal' | 'error' = 'normal';
    export let tip: string = "";
    export let size: 'default' | 'small' | 'large' = "default";

    export let spellcheck: boolean = false;
    export let isRequired: boolean = false;
    export let smartInput: boolean = true;
    // export let maxLength: number | null = null;
    
    export let onValueChange: (value: string) => void = (value: string) => {};

    let self: HTMLInputElement;

    // if the first and second characters are typed in a row,
    // the two characters are replaced by the third character
    export let triplets = [
        ['-', '-', '—'],
        ['-', '>', '→'],
        ['<', '-', '←'],
        ['!', '=', '≠'],
    ]

    // replace a character at `index` in a string `str`
    const setCharAt = (str: string, index: number, chr: string): string => {
        if(index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }

    // event handler
    $: value, onValueChange(value);
</script>

<main class:error={state === 'error'}>
    {#if label}
        <label for={id}>
            {label} 
            <span>{isRequired ? '*' : ''}</span>
        </label>
    {/if}   

    <input bind:this={self} class={size} bind:value={value} {placeholder} {spellcheck} type="text" name={id} {id} on:keydown={event => {
        if (!self.selectionStart || !smartInput) return;

        // TODO: maxLength attribute
        // TODO: hide input with dots, for passwords
        // if (maxLength && value.length >= maxLength && event.key !== 'Backspace' && !event.ctrlKey) {
        //    event.preventDefault();
        //    return;
        // }
        
        for (const [a, b, c] of triplets) {
            if (event.key === b && value[self.selectionStart - 1] === a) {
                event.preventDefault();
                value = setCharAt(value, self.selectionStart - 1, c);
                value.slice(self.selectionStart, 1);

                // update everything in svelte
                value = value;

                break;
            }
        }
    }}>

    {#if tip}
        <label class="tip" for={id}>{tip}</label>
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 4px;

        height: fit-content;
        width: 100%;
    }

    label {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 11px;
        line-height: 13px;
        letter-spacing: 0.025em;

        color: #7E7E7E;
        transform: translateX(10px);

        user-select: none;

        width: calc(100% - 17px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;        
    }

    label > span {
        color: #FF6369;
    }

    label.tip {
        font-size: 11px;
        font-weight: normal;
        color: #a0a0a0;
    }

    main.error > input[type="text"] {
        border: 1px solid #FF6369;
    }

    main.error > label.tip {
        color: #FF6369;
    }

    input[type="text"] {
        width: 100%;
        height: 36px;
        
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 16px;

        color: #EDEDED;
        
        outline: none;
        background: #232323;
        padding: 0px 10px;
        
        border: 1px solid rgba(0, 0, 0, 0.4);
        border-radius: 6px;

        transition: box-shadow 0.15s cubic-bezier(.26,.68,.12,.98),
            border 0.15s cubic-bezier(.26,.68,.12,.98);
    }

    input[type="text"]::placeholder {
        color: #7E7E7E;
    }

    input[type="text"]:hover {
        border: 1.5px solid rgba(0, 0, 0, 0.5);
        background: #242424;
    }

    input[type="text"].small {
        height: 28px;
    }

    input[type="text"].large {
        height: 42px;
    }
</style>