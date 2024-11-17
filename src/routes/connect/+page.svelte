<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$lib/components/ui/button";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs"
    import { enhance } from "$app/forms";
    import * as Alert from "$lib/components/ui/alert";
    import { CircleAlert } from 'lucide-svelte';
    
    export let form
    export let data
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<div class="flex flex-cols w-screen h-screen justify-center items-center bg-gradient-to-b from-bluesky to-mastodon">
    <div class="w-2/3 h-fit bg-white self-center justify-center content-center space-y-6 py-12 rounded-lg shadow-xl">
        <!-- Kaleido Logo -->
        <div class="flex flex-col items-center space-y-4">
            <img src="/kaleido-logo.svg" alt="Kaleido" class="h-40" />
        </div>
        
        <!-- Form -->
        <Tabs class="flex flex-col items-center justify-center gap-y-2 px-8 w-full">
            <!-- Tabs -->
            <TabsList class="md:w-1/2 w-full bg-white">
                <TabsTrigger value="mastodon" class="w-1/2 border-2 border-transparent data-[state=active]:border-kaleido">
                    <img src="/mastodon-logo.svg" alt="Mastodon" class="h-6" />
                </TabsTrigger>
                <TabsTrigger value="bluesky" class="w-1/2 border-2 border-transparent data-[state=active]:border-kaleido">
                    <img src="/bluesky-logo.svg" alt="Bluesky" class="h-6" />
                </TabsTrigger>
            </TabsList>
            
            <!-- Mastodon -->
            <TabsContent value="mastodon" class="w-full">
                
                <!-- Connected -->
                {#if data.mastodonUsername}
                <div class="flex flex-col items-center justify-center gap-y-2 w-full">
                    <img src="{data.mastodonPicture}" alt="Profile" class="w-16 h-16 rounded-full" />
                    <div class="flex flex-col items-center justify-center gap-y-0 w-full">
                        <span class="max-w-xs">{data.mastodonDisplayName}</span>
                        <span class="max-w-xs text-sm text-muted-foreground">@{data.mastodonUsername}</span>
                    </div>
                    <div class = "flex flex-col items-center justify-center gap-y-0 w-full">
                        <Button href="/logoutMastodon" class="max-w-xs w-full bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido">
                            Disconnect
                        </Button>
                        <Button href="/timeline" class="max-w-xs font-light text-xs text-kaleido" variant="link">
                            Back
                        </Button>
                    </div>
                </div>
                
                <!-- Not Connected -->
                {:else}
                <form method="POST" action="?/mastodon" use:enhance>
                    {#if form?.error && form.error.platform === "mastodon"}
                        <div class="flex flex-col items-center justify-center gap-y-2 px-8 w-full mb-2 error">
                            <Alert.Root variant="destructive" class="max-w-xs">
                                <CircleAlert class="h-4 w-4" />
                                <Alert.Title>Error</Alert.Title>
                                <Alert.Description>
                                    {form.error.message}
                                </Alert.Description>
                            </Alert.Root>
                        </div>
                    {/if}
                    <div class="flex flex-col items-center justify-center gap-y-2 w-full">
                        <Label for="instance" class="items-start max-w-xs w-full">Instance URL</Label>
                        <Input name="instance" placeholder="mastodon.social" class="max-w-xs w-full"/>
                        <div class="flex flex-col items-center justify-center gap-y-0 w-full">
                            <Button type="submit" class="max-w-xs w-full bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido">
                                Connect
                            </Button>
                            <Button href="/timeline" class="max-w-xs font-light text-xs text-kaleido" variant="link">
                                Back
                            </Button>
                        </div>
                    </div>    
                </form>
                {/if}
            </TabsContent>
            
            <!-- Bluesky -->
            <TabsContent value="bluesky" class="w-full">
                
                <!-- Connected -->
                {#if data.bskyHandle}
                <div class="flex flex-col items-center justify-center gap-y-2 w-full">
                    <img src="{data.bskyPicture}" alt="Profile" class="w-16 h-16 rounded-full" />
                    <div class="flex flex-col items-center justify-center gap-y-0 w-full">
                        <span class="max-w-xs">{data.bskyDisplayName}</span>
                        <span class="max-w-xs text-sm text-muted-foreground">@{data.bskyHandle}</span>
                    </div>
                    <div class = "flex flex-col items-center justify-center gap-y-0 w-full">
                        <Button href="/logoutBluesky" class="max-w-xs w-full bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido">
                            Disconnect
                        </Button>
                        <Button href="/timeline" class="max-w-xs font-light text-xs text-kaleido" variant="link">
                            Back
                        </Button>
                    </div>
                </div>
                
                <!-- Not Connected -->
                {:else}
                <form method="POST" action="?/bluesky" use:enhance>
                    {#if form?.error && form.error.platform === "bluesky"}
                        <div class="flex flex-col items-center justify-center gap-y-2 px-8 w-full mb-2 error">
                            <Alert.Root variant="destructive" class="max-w-xs">
                                <CircleAlert class="h-4 w-4" />
                                <Alert.Title>Error</Alert.Title>
                                <Alert.Description>
                                    {form.error.message}
                                </Alert.Description>
                            </Alert.Root>
                        </div>
                    {/if}
                    <div class="flex flex-col items-center justify-center gap-y-2 w-full">
                        <Label for="handle" class="items-start max-w-xs w-full">Handle</Label>
                        <Input name="handle" placeholder="user.bsky.social" class="max-w-xs w-full"/>
                        <Label for="password" class="items-start max-w-xs w-full">Password</Label>
                        <Input name="password" placeholder="••••••••" class="max-w-xs w-full"/>
                        <div class="flex flex-col items-center justify-center gap-y-0 w-full">
                            <Button type="submit" class="max-w-xs w-full bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido">
                                Connect
                            </Button>
                            <Button href="/timeline" class="max-w-xs font-light text-xs text-kaleido" variant="link">
                                Back
                            </Button>
                        </div>
                    </div>
                </form> 
                {/if}
            </TabsContent>
        </Tabs>
    </div>
</div>