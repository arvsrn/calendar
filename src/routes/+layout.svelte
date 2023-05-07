<script lang="ts">
    // TODO: uncomment these lines for prod
    // import { dev } from '$app/environment';
    // import { inject } from '@vercel/analytics';
    import Toast from "./Toast.svelte";
    
    // inject({ mode: dev ? 'development' : 'production' });
</script>

<slot></slot>
<Toast></Toast>