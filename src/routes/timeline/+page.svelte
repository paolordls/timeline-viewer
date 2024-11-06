<script lang="ts">
	/** @type {import('./$types').PageData} */
    import Post from "$lib/components/ui/post.svelte";
    import { Button } from "$lib/components/ui/button";
    export let data
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<div class="flex flex-col items-center justify-center w-full h-screen">
    {#if (data.bskyHandle || data.mastodonUsername)}
        {#if data.posts.length === 0}
            <span class="w-48 mb-2 text-center block">No posts found.</span>
        {:else}
            {#each data.posts as post}
                <Post post={post} />
            {/each}
        {/if}
    {:else}
        <span class="w-48 mb-2 text-center block">No connected accounts</span>
        <Button class="w-48 bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido" href="/connect">
            Connect
        </Button>
    {/if}
</div>
