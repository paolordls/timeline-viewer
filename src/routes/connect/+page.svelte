<script>
    export let data;
    export let form;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{#if data.mastodonUsername}
<p> Display Name: {data.mastodonDisplayName}</p>
<p> Username: {data.mastodonUsername}</p>
<p> Account: {data.mastodonAcct} </p>
<a class="btn" href="/logoutMastodon">Logout from {data.mastodonInstance}</a>
{:else}
<br><br><a class="btn" href="{data.bskyLoginLink}">Log into a Mastodon Account</a>
<form method="POST" action="?/mastodon">
    <input class="input" name="instance" type="text" required value="mastodon.social">
    <button>Submit</button>
</form>
{/if}
{#if form?.error}
<p class="error"> Error: {form.error} </p>
{/if}

{#if data.bskyHandle}
<p> Did: {data.bskyDid}</p>
<p> Handle: {data.bskyHandle}</p>
<p> Display Name: {data.bskyDisplayName}</p>
<a class="btn" href="/logoutBluesky">Logout bluesky</a>
{:else}
<br><br><a class="btn" href="{data.bskyLoginLink}">Log into a BlueSky Account</a>
<form method="POST" action="?/bluesky">
    <input class="input" name="handle" type="text" required value="blueskytestuser.bsky.social">
    <input class="input" name="password" type="text" required value="cs173password">

    <button>Submit</button>
</form>
{/if}

{#if data.mastodonUsername || data.bskyHandle}
<a class="btn" href="/timeline">Go to timeline</a>
{/if}