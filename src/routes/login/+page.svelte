<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    export let form;
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<div class="flex flex-cols w-screen h-screen justify-center items-center bg-gradient-to-b from-bluesky to-mastodon">
    <div class="w-2/3 h-fit bg-white self-center justify-center content-center space-y-6 py-12 rounded-lg shadow-xl">
        <!-- Kaleido Logo -->
        <div class="flex flex-col items-center space-y-4">
            <img src="/kaleido-logomark.svg" alt="Kaleido" class="h-24" />
            <span class="text-center block">Log In</span>
        </div>
        <!-- Form -->
        <form method="POST">
            <div class="flex flex-col items-center justify-center gap-y-2 px-8 w-full">
                <Input type="email" name="email" placeholder="Email" class="max-w-xs"/>
                <Input type="password" name="password" placeholder="Password" class="max-w-xs"/>
                <Button type="submit" href="/login/success" class="max-w-xs w-full bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido">
                    Log In
                </Button>
                <Button type="button" class="max-w-xs font-extralight text-xs text-kaleido" variant="link">
                    Forgot Password?
                </Button>
            </div>
            {#if form?.error}
                <p class="error"> Error: {form.error} </p>
            {/if}
        </form>
    </div>
</div>