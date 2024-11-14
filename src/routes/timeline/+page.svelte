<script lang="ts">
	/** @type {import('./$types').PageData} */
    import Post from "$lib/components/ui/post.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Frown } from 'lucide-svelte';

    export let data
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<div class="flex flex-col items-center justify-center w-full">
    {#if (data.bskyHandle || data.mastodonUsername)}
        {#if data.posts.length === 0}
            <div class="flex flex-col items-center justify-center w-full h-screen">
                <Frown class="w-40 h-40 mb-4 opacity-10" />
                <span class="w-48 mb-2 text-center block">No posts found.</span>
            </div>
        {:else}
            {#each data.posts as post}
                <Post post={post} />
            {/each}
        {/if}
    {:else}
        <div class="flex flex-col items-center justify-center w-full h-screen">
            <Frown class="w-40 h-40 mb-4 opacity-10" />
            <span class="w-48 mb-2 text-center block">No connected accounts.</span>
            <Button class="w-48 bg-kaleido border-2 border-transparent hover:border-kaleido hover:bg-transparent hover:text-kaleido" href="/connect">
                Connect
            </Button>
        </div>
    {/if}
</div>
