<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    export let data;
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<div class="flex flex-cols w-screen h-screen justify-center items-center bg-bluesky">
    <div class="w-2/3 h-fit bg-white self-center justify-center content-center space-y-10 py-12 rounded-lg shadow-xl">
        <div class="space-y-4 flex flex-col items-center">
            <img src="/bluesky-logo.svg" alt="Bluesky" class="h-12" />
        </div>
        {#if data.bskyHandle}
            <p> Did: {data.bskyDid}</p>
            <p> Handle: {data.bskyHandle}</p>
            <p> Display Name: {data.bskyDisplayName}</p>
            <a class="btn" href="/logoutBluesky">Logout bluesky</a>
        {:else}
        <br><br><a class="btn" href="{data.bskyLoginLink}">Log into a BlueSky Account</a>
        <form method="POST" action="?/bluesky">
            <div class="flex flex-col items-center justify-center gap-y-1 px-8 w-full">
                <Input type="email" name="handle" placeholder="Email" class="max-w-xs"/>
                <Input type="password" name="password" placeholder="Password" class="max-w-xs"/>
            </div>
            <div class="flex flex-col items-center justify-center gap-y-1 px-8 w-full">
                <Button class="max-w-xs w-full bg-bluesky border-2 border-transparent hover:border-bluesky hover:bg-transparent hover:text-bluesky">Authenticate</Button>
            </div>
        </form>
        {/if}
    </div>
</div>