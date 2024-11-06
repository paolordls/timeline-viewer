<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import { Button } from "$lib/components/ui/button";
    import { RefreshCw } from 'lucide-svelte';
    import { FilePenLine } from 'lucide-svelte';
</script>

<nav class="bg-inherit text-white p-4 border-b-2 border-solid border-gray-200 max-w-screen">
    <div class="flex flex-row items-center place-content-between">
        <!-- User -->
        <Sheet.Root>
            <Sheet.Trigger>
                <Avatar.Root>
                    <Avatar.Fallback class="w-10 h-10 bg-kaleido border-2 border-transparent hover:bg-transparent hover:border-kaleido hover:text-kaleido">RF</Avatar.Fallback>
                </Avatar.Root>
            </Sheet.Trigger>
            
            <Sheet.Content side=left class="flex flex-col justify-between h-full [&>button]:hidden">
                <!-- User Details -->
                <div class="flex flex-col mb-2">
                    <Avatar.Root class="mb-2">
                        <Avatar.Fallback class="w-10 h-10 bg-kaleido text-white border-2 border-transparent">RF</Avatar.Fallback>
                    </Avatar.Root>
                    <Sheet.Header class="font-medium">
                        Rom Feria
                    </Sheet.Header>
                    <Sheet.Description>
                        @rpferia.dcs.upd.edu.ph
                    </Sheet.Description>
                </div>

                <!-- Accounts -->
                <div class="flex flex-col">
                    <div class="flex flex-row items-center place-content-between mb-4">
                        <Sheet.Header class="font-medium">
                            Accounts
                        </Sheet.Header>
                        <Sheet.Description>
                            <a href="/connect" class="p-0 font-small text-kaleido hover:underline">
                                <!-- <FilePenLine class="w-6 h-6 text-kaleido" strokeWidth={2}/> -->
                                Manage
                            </a>
                        </Sheet.Description>
                    </div>
                    <div class="flex flex-col items-center gap-y-2">
                        <Button class="w-full h-full bg-transparent border-2 border-mastodon text-mastodon py-8 hover:bg-transparent" variant="link">
                            No Mastodon account connected.
                            <!-- <img src="/mastodon-logo.svg" alt="Mastodon" class="w-1/3 ml-2 mr-2"/> -->
                            <br />
                        </Button>
                        <Button class="w-full h-full bg-transparent border-2 border-bluesky text-bluesky py-8 hover:bg-transparent" variant="link">
                            No Bluesky account connected.
                            <!-- <img src="/bluesky-logo.svg" alt="Bluesky" class="w-1/3 ml-2 mr-2"/> -->
                            <br />
                        </Button>
                    </div>
                </div>

                <!-- Log Out -->
                <div class="mt-auto flex flex-col items-center">
                    <Button href="/logoutKaleido" class="w-full bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido">
                        Log Out
                    </Button>
                </div>

            </Sheet.Content>
        </Sheet.Root>
        
        <!-- Kaleido Logo -->
        <img src="/kaleido-logomark.svg" alt="Kaleido" class="w-12 h-12" />
        
        <!-- Refresh -->
        <Button class="bg-kaleido w-10 h-10 rounded-full p-2 border-2 border-transparent hover:bg-transparent hover:border-kaleido hover:text-kaleido">
            <RefreshCw class="w-full h-full" strokeWidth={2}/>
        </Button>
    </div>
</nav>