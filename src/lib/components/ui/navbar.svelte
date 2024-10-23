<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar";
    import { Button } from "$lib/components/ui/button";
    import { RefreshCw } from 'lucide-svelte';
  </script>

<nav class="bg-inherit text-white p-4 border-b-2 border-solid border-gray-200 max-w-screen">
    <div class="flex flex-row items-center place-content-between">
        <!-- User -->
        <Button class="w-10 h-10 rounded-full bg-transparent hover:bg-transparent">
            <Avatar.Root>
                <Avatar.Fallback class="bg-kaleido border-2 border-transparent hover:bg-transparent hover:border-kaleido hover:text-kaleido">RF</Avatar.Fallback>
            </Avatar.Root>
        </Button>
        
        <!-- Kaleido Logo -->
        <img src="/kaleido-logomark.svg" alt="Kaleido" class="w-12 h-12" />
        
        <!-- Refresh -->
        <Button class="bg-kaleido w-10 h-10 rounded-full p-2 border-2 border-transparent hover:bg-transparent hover:border-kaleido hover:text-kaleido">
            <RefreshCw class="w-full h-full" strokeWidth={2}/>
        </Button>
    </div>
</nav>