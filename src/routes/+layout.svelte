<script lang="ts">
    import { page } from "$app/stores";
    import { addNotification, notifications } from "../core";
    // TODO: uncomment these lines for prod
    // import { dev } from '$app/environment';
    // import { inject } from '@vercel/analytics';
    import Toast from "./Toast.svelte";
    
    // inject({ mode: dev ? 'development' : 'production' });

    notifications.set([]);
    $page.url.searchParams.forEach((v, k) => {
        if (k == 'error')
            addNotification({ heading: v, description: "You were redirected to the application page." });
    });
</script>

<slot></slot>
<Toast></Toast>