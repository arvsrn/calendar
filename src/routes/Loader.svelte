<div></div>

<style>
    @keyframes donut-spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    div {
        display: inline-block;
        border: 4px solid var(--border3);
        border-left-color: var(--text2);
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: donut-spin 1.2s linear infinite;
    }
</style>