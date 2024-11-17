<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$lib/components/ui/button";
    import * as Alert from "$lib/components/ui/alert";
    import { CircleAlert } from 'lucide-svelte';
    
    export let form;
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<div class="flex flex-cols w-screen h-screen justify-center items-center bg-gradient-to-b from-bluesky to-mastodon">
    <div class="w-2/3 h-fit bg-white self-center justify-center content-center space-y-6 py-12 rounded-lg shadow-xl">
        <!-- Kaleido Logo -->
        <div class="flex flex-col items-center space-y-4">
            <img src="/kaleido-logo.svg" alt="Kaleido" class="h-40" />
        </div>
        <!-- Form -->
        <form method="POST">
            {#if form?.error}
                <div class="flex flex-col items-center justify-center gap-y-2 px-8 w-full mb-2">
                    <Alert.Root variant="destructive" class="max-w-xs">
                        <CircleAlert class="h-4 w-4" />
                        <Alert.Title>Error</Alert.Title>
                        <Alert.Description>
                            {form.error}
                        </Alert.Description>
                    </Alert.Root>
                </div>
            {/if}
            <div class="flex flex-col items-center justify-center gap-y-2 px-8 w-full">
                <Label for="email" class="items-start max-w-xs w-full">Email</Label>
                <Input type="email" name="email" placeholder="test@test.com" class="max-w-xs"/>
                <Label for="password" class="items-start max-w-xs w-full">Password</Label>
                <Input type="password" name="password" placeholder="••••••••" class="max-w-xs"/>
                <div class="flex flex-col items-center justify-center gap-y-0 w-full">
                    <Button type="submit" class="max-w-xs w-full bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido">
                        Log In
                    </Button>
                    <!-- <Button class="max-w-xs font-light text-xs text-kaleido" variant="link">
                        Forgot Password?
                    </Button> -->
                </div>
            </div>
        </form>
    </div>
</div>