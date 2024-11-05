<script>
    import Navbar from "$lib/components/ui/navbar.svelte";
    import { Button } from "$lib/components/ui/button";
    export let data
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Navbar -->
<Navbar />
<div class="flex flex-col items-center justify-center h-screen">
    <!-- No connected accounts -->    
    {#if (data.bskyHandle || data.mastodonUsername)}
        <span class="w-48 mb-2 text-center block">Account connected.</span> 
    {:else}
        <span class="w-48 mb-2 text-center block">No connected accounts</span>
    {/if}
    <Button class="w-48 bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido" href="/connect">
        Connect
    </Button>
</div>