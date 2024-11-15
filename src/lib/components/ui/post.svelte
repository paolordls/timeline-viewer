<script lang="ts">
    import { Platform, type Post } from "$lib/models/Post";
    import { formatRelativeTime } from "$lib/utils";
    import { IconBadge } from "$lib/components/ui/iconbadge/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    // import Button from "./button/button.svelte";
    import EllipsisVertical from 'lucide-svelte/icons/ellipsis-vertical';
    import Like from 'lucide-svelte/icons/heart';
    import Comment from 'lucide-svelte/icons/message-square';
    import Share from 'lucide-svelte/icons/repeat-2';
    import { abbreviateNumber } from "$lib/utils";

    export let post: Post;

    const dateTime = formatRelativeTime(post.postDateTime);

    const likeCountLabel = abbreviateNumber(post.postEngagement.likes);
    const shareCountLabel = abbreviateNumber(post.postEngagement.shares);
    const commentCountLabel = abbreviateNumber(post.postEngagement.comments);

    const colorIndicator = post.platform === Platform.Mastodon ? "#563ACC" : "#4FB0FF";
</script>

<div class="flex flex-row w-full">
    <div class="w-2 h-auto" style="background-color: {colorIndicator}"></div>

    <div class="flex flex-row w-full border-b-2 px-4 py-2 border-solid border-gray-100 hover:bg-gray-100">
        <img src={post.posterProfilePicture} alt="Profile" class="w-14 h-14 rounded-full" />

        <div class="flex flex-col pl-4 gap-y-2 w-full">
            <div class="flex flex-col gap-y-1 w-full">
                <div class="flex flex-row w-full place-content-between">
                    <div class="flex flex-row gap-x-2 flex-wrap">
                        <div class="text-base font-bold">{post.posterDisplayName}</div>
    
                        <div class="text-sm font-light text-gray-500 line-clamp-1 self-center">@{post.posterUsername} ⋅ {dateTime}</div>
                    </div>
                    <div>
                        <!-- <Button size="icon" variant="ghost" class="h-6 w-6">
                            <EllipsisVertical class="h-4 w-4"/>
                        </Button> -->
                    </div>
                </div>

                {#if post.platform === Platform.Mastodon}
                <p class="mastodonPost w-auto text-base font-light text-current min-w-0">{@html post.postText}</p>
                {:else}
                <p class="w-auto text-base font-light text-current min-w-0">{post.postText}</p>
                {/if}
            </div>
            
            {#if post.postEmbeds.length > 0}
                <div class="flex flex-row flex-wrap gap-1">
                    {#each post.postEmbeds as embed}
                        <IconBadge href={embed.href} target="_blank" variant="secondary" iconType={embed.type}>
                            {embed.title}
                        </IconBadge>
                    {/each} 
                </div>
            {/if}

            {#if post.postHashtags.length > 0}
                <div class="flex flex-row flex-wrap gap-1">
                    {#each post.postHashtags as hashtag}
                        <a href="{hashtag.url}" target="_blank" class="text-sm text-gray-500 font-light">
                            #{hashtag.name}
                        </a>
                    {/each} 
                </div>
            {/if}
            
            <div class="flex flex-row gap-x-10 justify-between">
                <div class="flex flex-row justify-left gap-x-10 min-w-0">
                    <div class="flex flex-row items-center p-0 gap-1 font-light text-slate-500 text-sm">
                        <Comment class="h-4 w-4"/>
                        {commentCountLabel}
                    </div>
    
                    <div class="flex flex-row items-center p-0 gap-1 font-light text-slate-500 text-sm">
                        <Like class="h-4 w-4"/>
                        {likeCountLabel}
                    </div>
    
                    <div class="flex flex-row items-center p-0 gap-1 font-light text-slate-500 text-sm">
                        <Share class="h-4 w-4"/>
                        {shareCountLabel}
                    </div>
                </div>

                <a href={post.originalPostLink} target="_blank" class="flex flex-row items-center gap-1">
                    <span class="underline text-gray-500 text-xs font-extralight line-clamp-1 italic">via</span>

                    {#if post.platform === Platform.Mastodon}
                        <img src="/mastodon_small.svg" class="h-4 w-4" alt="Mastodon logo"/>
                    {/if}
                    {#if post.platform === Platform.Bluesky}
                        <img src="bluesky_small.svg" class="h-4 w-4" alt="Bluesky logo"/>
                    {/if}
                </a>
            </div>
        </div>
    </div>
</div>

<style>
    .mastodonPost :global(i) {
        font-style: italic !important;
    }
    .mastodonPost :global(b) {
        font-weight: bold !important;
    }
    .mastodonPost :global(a > span){
        text-decoration: underline !important;
    }
</style>