<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import { Button } from "$lib/components/ui/button";
    import { Toggle } from "$lib/components/ui/toggle";
    import { RefreshCw } from 'lucide-svelte';
    import { Eye } from 'lucide-svelte';
    import { EyeClosed } from 'lucide-svelte';
    import { isBlueskyToggled } from '../../../stores/blueskyToggle';
    import { isMastodonToggled } from '../../../stores/mastodonToggle';

    function toggleMastodon() {
        isMastodonToggled.update(n => !n)
    }

    function toggleBluesky() {
        isBlueskyToggled.update(n => !n)
    }

    export let userInfo: object = {};
    export let refreshFunction;
</script>

<nav class="sticky top-0 left-0 right-0 bg-white text-white p-4 border-b-2 border-solid border-gray-200 max-w-screen">
    <div class="flex flex-row items-center place-content-between">
        <!-- User -->
        <!-- Sidebar -->
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
                    <div class="flex flex-col mb-4">
                        <div class="flex flex-row items-center place-content-between mb-2">
                            <Sheet.Header class="font-medium">
                                Accounts
                            </Sheet.Header>
                            <Sheet.Description>
                                <a href="/connect" class="p-0 font-small text-kaleido hover:underline">
                                    Manage
                                </a>
                            </Sheet.Description>
                        </div>
                        <Sheet.Description>
                            To connect or disconnect an account, click Manage.
                        </Sheet.Description>
                    </div>

                    <!-- Toggle -->
                    <div class="flex flex-col items-center gap-y-2">
                        
                        <!-- Mastodon -->
                        {#if userInfo.mastodonHandle}
                            <div class={`${!$isMastodonToggled ? 'opacity-50' : 'opacity-100'} flex flex-row w-full h-full content-center bg-transparent border-2 border-mastodon rounded-md text-mastodon py-6 px-2`}>
                                    <div class="flex flex-col ml-2 mr-4">
                                        <img src={userInfo.mastodonPicture} alt="Mastodon Account" class="w-10 h-10 rounded-full object-cover"/>
                                    </div>
                                    <div class="flex flex-col gap-y-0">
                                        <span class="max-w-xs">{userInfo.mastodonDisplayName || userInfo.mastodonHandle}</span>
                                        <span class="max-w-xs text-sm text-muted-foreground">@{userInfo.mastodonHandle}@{userInfo.mastodonInstance}</span>
                                    </div>
                                    <div class="flex flex-col mr-0 ml-auto mt-auto mb-auto bg-transparent text-mastodon">
                                        <Toggle aria-label="toggle visible" on:click={toggleMastodon} class="data-[state=on]:bg-transparent data-[state=on]:text-mastodon hover:bg-transparent hover:text-mastodon">
                                            {#if !$isMastodonToggled}
                                                <EyeClosed class="h-6 w-6" />
                                            {:else}
                                                <Eye class="h-6 w-6" />
                                            {/if}
                                        </Toggle>
                                    </div>
                            </div>
                        {:else}
                            <div class='opacity-50 flex flex-col w-full h-full text-center bg-transparent border-2 border-mastodon rounded-md text-mastodon text-sm py-8 px-2'>
                                    No Mastodon account connected.
                            </div>
                        {/if}

                        <!-- Bluesky -->
                        {#if userInfo.bskyHandle}
                            <div class={`${!$isBlueskyToggled ? 'opacity-50' : 'opacity-100'} flex flex-row w-full h-full content-center bg-transparent border-2 border-bluesky rounded-md text-bluesky py-6 px-2`}>
                                    <div class="flex flex-col ml-2 mr-4">
                                        <img src={userInfo.bskyPicture} alt="Bluesky Account" class="w-10 h-10 rounded-full object-cover"/>
                                    </div>
                                    <div class="flex flex-col gap-y-0">
                                        <span class="max-w-xs">{userInfo.bskyDisplayName}</span>
                                        <span class="max-w-xs text-sm text-muted-foreground">@{userInfo.bskyHandle}</span>
                                    </div>
                                    <div class="flex flex-col mr-0 ml-auto mt-auto mb-auto bg-transparent text-bluesky">
                                        <Toggle aria-label="toggle visible" on:click={toggleBluesky} class="data-[state=on]:bg-transparent data-[state=on]:text-bluesky hover:bg-transparent hover:text-bluesky">
                                            {#if !($isBlueskyToggled)}
                                                <EyeClosed class="h-6 w-6" />
                                            {:else}
                                                <Eye class="h-6 w-6" />
                                            {/if}
                                        </Toggle>
                                    </div>
                            </div>
                        {:else}
                            <div class='opacity-50 flex flex-col w-full h-full text-center bg-transparent border-2 border-bluesky rounded-md text-bluesky text-sm py-8 px-2'>
                                No Bluesky account connected.
                            </div>
                        {/if}
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
        <Button on:click={refreshFunction} class="bg-kaleido w-10 h-10 rounded-full p-2 border-2 border-transparent hover:bg-transparent hover:border-kaleido hover:text-kaleido">
            <RefreshCw class="w-full h-full" strokeWidth={2}/>
        </Button>
    </div>
</nav>