<script lang="ts">
	/** @type {import('./$types').PageData} */
    import Post from "$lib/components/ui/post.svelte";
	export let data;
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<div class="flex flex-col w-full h-full">
    {#each data.posts as post}
        <Post post={post} />
    {/each}
</div>
