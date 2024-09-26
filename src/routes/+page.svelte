<script>
    export let data;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{#if data.mastodonUsername}
<p> Display Name: {data.mastodonDisplayName}</p>
<p> Username: {data.mastodonUsername}</p>
<p> Account: {data.mastodonAcct} </p>
<a class="btn" href="/logoutMastodon">Logout mastodon</a>
{:else}
<a class="btn" href="{data.mastodonLoginLink}">Click here to log into a Mastodon Account</a>
{/if}


