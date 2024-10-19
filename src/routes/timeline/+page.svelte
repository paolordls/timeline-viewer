<script>
    export let data;
</script>

<h1> Timeline </h1>
<a class="btn" href="/">Go to login</a>
{#each data.mastodonTimeline as status}
<p>Username: {status.account.username}</p>
<p>Post content: {status.content || status.reblog.content}</p>
{/each}

{#each data.blueskyTimeline as status}
<h1>post</h1>
    <p>platform: {status.platform} </p>
    <p>posterDisplayName: {status.posterDisplayName}</p>
    <p>posterUsername: {status.posterUsername}</p>
    <p>postDateTime: {status.postDateTime}</p>
    <p>postText: {status.postText}</p>
    <p>postEmbeds: {status.postEmbeds}</p>
    <p>likes:{status.postEngagement.likes}</p>
    <p>shares:{status.postEngagement.shares}</p>
    <p>comments:{status.postEngagement.comments}</p>
    <p>originalPostLink: {status.originalPostLink}</p>
{/each}
