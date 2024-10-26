<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs"
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
                <div class="flex flex-col items-center justify-center gap-y-2 w-full">
                    <Input type="url" placeholder="URL" class="max-w-xs"/>
                    <Button class="max-w-xs w-full bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido" href="/login/success">
                        Connect
                    </Button>
                </div>    
            </TabsContent>
            
            <!-- Bluesky -->
            <TabsContent value="bluesky" class="w-full">
                <div class="flex flex-col items-center justify-center gap-y-2 w-full">
                    <Input type="email" placeholder="Email" class="max-w-xs"/>
                    <Input type="password" placeholder="Password" class="max-w-xs"/>
                    <Button class="max-w-xs w-full bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido" href="/login/success">
                        Connect
                    </Button>
                </div>
            </TabsContent>
        </Tabs>
    </div>
</div>