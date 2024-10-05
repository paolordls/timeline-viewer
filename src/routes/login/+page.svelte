<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<div class="flex items-center justify-center min-h-screen">
    <div class="flex flex-col items-center justify-center w-3/5 gap-y-8">
        <img src="/clock.svg" alt="Icon" class="w-24 h-24" />
        <div class="flex flex-col items-center justify-center gap-y-1 w-full">
            <Input type="email" placeholder="Email" class="max-w-xs font-thin"/>
            <Input type="password" placeholder="Password" class="max-w-xs font-thin"/>
        </div>
        <div class="flex flex-col items-center justify-center gap-y-1 w-full">
            <Button class="max-w-xs w-full">Sign In</Button>
            <Button class="max-w-xs font-extralight text-xs text-gray-500" variant="ghost">Forgot Password?</Button>
        </div>
    </div>
</div>