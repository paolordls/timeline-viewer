<script>
    export let data;
</script>

<h1> Timeline </h1>
<a class="btn" href="/">Go to login</a>
{#each data.mastodonTimeline as status}
<p>Username: {status.account.username}</p>
<p>Post content: {status.content || status.reblog.content}</p>
{/each}
