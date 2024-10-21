<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<div class="flex flex-cols w-screen h-screen justify-center items-center bg-gradient-to-b from-bluesky to-mastodon">
    <div class="w-2/3 h-fit bg-white self-center justify-center content-center space-y-10 py-12 rounded-lg shadow-xl">
        <div class="space-y-4 flex flex-col items-center">
            <img src="/kaleido-logomark.svg" alt="Kaleido" class="w-24 h-24" />
        </div>
        <div class="flex flex-col items-center justify-center gap-y-1 px-8 w-full">
            <Input type="email" placeholder="Email" class="max-w-xs"/>
            <Input type="password" placeholder="Password" class="max-w-xs"/>
        </div>
        <div class="flex flex-col items-center justify-center gap-y-1 px-8 w-full">
            <Button class="max-w-xs w-full bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido">Sign In</Button>
            <Button class="max-w-xs font-extralight text-xs text-gray-500 text-kaleido" variant="link">Forgot Password?</Button>
        </div>
    </div>
</div>

<!-- <div class="flex items-center justify-center w-screen h-screen">
    <div class="w-full h-full">
        <img src="/login-bg.png" alt="Background" class="max-w-5xl self-center" />
    </div>

    <div class="flex flex-col items-center justify-center w-3/5 gap-y-8">
        <img src="/kaleido-logomark.svg" alt="Kaleido" class="w-24 h-24" />
        <div class="flex flex-col items-center justify-center gap-y-1 w-full">
            <Input type="email" placeholder="Email" class="max-w-xs font-thin"/>
            <Input type="password" placeholder="Password" class="max-w-xs font-thin"/>
        </div>
        <div class="flex flex-col items-center justify-center gap-y-1 w-full">
            <Button class="max-w-xs w-full bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido">Sign In</Button>
            <Button class="max-w-xs font-extralight text-xs text-gray-500" variant="link">Forgot Password?</Button>
        </div>
    </div>
</div> -->