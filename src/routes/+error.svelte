<script lang="ts">
    import { page } from "$app/stores";
</script>

<main>
    <svg style:margin-bottom="8px" width="75" height="70" viewBox="0 0 75 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 19.16V50.84L37.5 68M1 19.16L37.5 36.32M1 19.16L10.125 14.87L14.6875 12.725L23.8125 17.015M37.5 68V36.32M37.5 68L51.1875 61.565M74 19.16V50.84L60.3125 57.275M74 19.16L37.5 2L28.375 6.29L23.8125 8.435M74 19.16L64.875 23.45L60.3125 25.595M37.5 36.32L46.625 32.03L51.1875 29.885M23.8125 8.435L60.3125 25.595M23.8125 8.435V17.015M51.1875 29.885L23.8125 17.015M51.1875 29.885V53M60.3125 25.595V57.275M60.3125 57.275L51.1875 61.565M60.3125 57.275L51.1875 53M51.1875 61.565V53" stroke="#ededed" stroke-width="2"/>
    </svg>           
    <h1>Error: {$page.error?.message}</h1>
    <p>Why are you here? The app is over at <a href="">calendar.aarv.me</a>.</p>
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;

        background: #1c1c1c;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;

        overflow-y: auto;
        position: relative;
    }

    h1, p {
        max-width: 600px;
        text-align: center;
    }

    h1 {
        color: #ededed;
        font-size: 15px;
        font-weight: bold;
    }

    @media only screen and (max-width: 857.14px) {
        h1, p {
            width: 70vw;
        }
    }

    p {
        font-size: 13px;
        color: #ededed;
    }

    a {
        text-decoration: none;
        background: #ededed;
        color: #1c1c1c;
        font-weight: 500;
    }
</style>