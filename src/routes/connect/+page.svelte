<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs"
    import { enhance } from "$app/forms";
    export let form
    export let data
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<div class="flex flex-cols w-screen h-screen justify-center items-center bg-gradient-to-b from-bluesky to-mastodon">
    <div class="w-2/3 h-fit bg-white self-center justify-center content-center space-y-6 py-12 rounded-lg shadow-xl">
        <!-- Kaleido Logo -->
        <div class="flex flex-col items-center space-y-4">
            <img src="/kaleido-logomark.svg" alt="Kaleido" class="h-24" />
            <span class="text-center block">Connect Account</span>
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
                {#if data.mastodonUsername}
                    <p> Display Name: {data.mastodonDisplayName}</p>
                    <p> Username: {data.mastodonUsername}</p>
                    <p> Account: {data.mastodonAcct} </p>
                    <a class="btn" href="/logoutMastodon">Logout from {data.mastodonInstance}</a>
                {:else}
                <form method="POST" action="?/mastodon" use:enhance>
                    <div class="flex flex-col items-center justify-center gap-y-2 w-full">
                        <Input name="instance" placeholder="URL" class="max-w-xs"/>
                        <Button type="submit" class="max-w-xs w-full bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido">
                            Connect
                        </Button>
                        <Button type="button" class="max-w-xs font-light text-xs text-kaleido" variant="link" href="/timeline">
                            Cancel
                        </Button>
                    </div>    
                </form>
                {/if}
                {#if form?.error && form.error.platform === "mastodon"}
                    <p class="error"> Error: {form.error.message} </p>
                {/if}
            </TabsContent>
            
            <!-- Bluesky -->
            <TabsContent value="bluesky" class="w-full">
                {#if data.bskyHandle}
                    <p> Did: {data.bskyDid}</p>
                    <p> Handle: {data.bskyHandle}</p>
                    <p> Display Name: {data.bskyDisplayName}</p>
                    <a class="btn" href="/logoutBluesky">Logout bluesky</a>
                {:else}
                <form method="POST" action="?/bluesky" use:enhance>
                    <div class="flex flex-col items-center justify-center gap-y-2 w-full">
                        <Input name="handle" placeholder="Handle" class="max-w-xs"/>
                        <Input type="password" name="password" placeholder="Password" class="max-w-xs"/>
                        <Button type="submit" class="max-w-xs w-full bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido">
                            Connect
                        </Button>
                        <Button type="button" class="max-w-xs font-light text-xs text-kaleido" variant="link" href="/timeline">
                            Cancel
                        </Button>
                    </div>
                </form> 
                {/if}
                {#if form?.error && form.error.platform === "bluesky"}
                    <p class="error"> {form.error.message} </p>
                {/if}
            </TabsContent>
        </Tabs>
    </div>
</div>
