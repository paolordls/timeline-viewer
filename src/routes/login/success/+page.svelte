<script>
    import Navbar from "$lib/components/ui/navbar.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Button } from "$lib/components/ui/button";
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<Navbar />

<div class="flex flex-col items-center justify-center h-screen">
    <span class="w-48 mb-2 text-center block">No connected accounts</span>
    
    <Dialog.Root>
        <Dialog.Trigger>
            <Button class="w-48 bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido">
                + Connect
            </Button>
        </Dialog.Trigger>
        
        <Dialog.Content>
            <Dialog.Header>
                <Dialog.Title>Manage Accounts</Dialog.Title>
            </Dialog.Header>
            
            <!-- Mastodon -->
            <div class="grid items-center gap-4">
                <Button class="flex flex-col items-center py-12 border-mastodon text-mastodon hover:text-mastodon" variant="outline" href="/connect/mastodon">
                    <span class="mb-2">+ Connect to</span>
                    <img src="/mastodon-logo.svg" alt="Mastodon" class="h-8 mb-2" />
                </Button>
            </div>
            
            <!-- Bluesky -->
            <div class="grid items-center gap-4">
                <Button class="relative flex flex-col items-center py-12 border-bluesky text-bluesky hover:text-bluesky" variant="outline" href="/connect/bluesky">
                    <span class="mb-2">+ Connect to</span>
                    <img src="/bluesky-logo.svg" alt="Bluesky" class="h-8 mb-2" />
                </Button>
            </div>            
        </Dialog.Content>
    </Dialog.Root>
</div>