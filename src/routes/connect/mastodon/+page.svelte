<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    export let form;
    export let data;
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<div class="flex flex-cols w-screen h-screen justify-center items-center bg-mastodon">
    <div class="w-2/3 h-fit bg-white self-center justify-center content-center space-y-10 py-12 rounded-lg shadow-xl">
        <div class="space-y-4 flex flex-col items-center">
            <img src="/mastodon-logo.svg" alt="Mastodon" class="h-12" />
        </div>
        {#if data.mastodonUsername}
            <p> Display Name: {data.mastodonDisplayName}</p>
            <p> Username: {data.mastodonUsername}</p>
            <p> Account: {data.mastodonAcct} </p>
            <a class="btn" href="/logoutMastodon">Logout from {data.mastodonInstance}</a>
        {:else}
        <form method="POST">
            <div class="flex flex-col items-center justify-center gap-y-1 px-8 w-full">
                <Input name="instance" placeholder="URL" class="max-w-xs"/>
            </div>
            <div class="flex flex-col items-center justify-center gap-y-1 px-8 w-full">
                <Button class="max-w-xs w-full bg-mastodon border-2 border-transparent hover:border-mastodon hover:bg-transparent hover:text-mastodon">Authenticate</Button>
            </div>
        </form>
        {/if}
        {#if form?.error}
            <p class="error"> Error: {form.error} </p>
        {/if}
    </div>
</div>