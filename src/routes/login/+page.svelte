<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<div class="flex flex-cols w-screen h-screen justify-center items-center bg-gradient-to-b from-bluesky to-mastodon">
    <div class="w-2/3 h-fit bg-white self-center justify-center content-center space-y-6 py-12 rounded-lg shadow-xl">
        <!-- Kaleido Logo -->
        <div class="flex flex-col items-center space-y-4">
            <img src="/kaleido-logomark.svg" alt="Kaleido" class="h-24" />
            <span class="text-center font-medium block">Log In</span>
        </div>
        
        <!-- Form -->
        <div class="flex flex-col items-center justify-center gap-y-2 px-8 w-full">
            <Input type="email" placeholder="Email" class="max-w-xs"/>
            <Input type="password" placeholder="Password" class="max-w-xs"/>
            <Button href="/login/success" class="max-w-xs w-full bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido">
                Sign In
            </Button>
            <Button class="max-w-xs font-extralight text-xs text-kaleido" variant="link">
                Forgot Password?
            </Button>
        </div>
    </div>
</div>