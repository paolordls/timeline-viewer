<script lang="ts">
    import { Platform, type Post } from "$lib/models/Post";
    import { formatRelativeTime } from "$lib/utils";
    import Button from "./button/button.svelte";
    import EllipsisVertical from 'lucide-svelte/icons/ellipsis-vertical';
    import Like from 'lucide-svelte/icons/heart';
    import Comment from 'lucide-svelte/icons/message-square';
    import Share from 'lucide-svelte/icons/repeat-2';
    import Views from 'lucide-svelte/icons/chart-no-axes-column';
    import { abbreviateNumber } from "$lib/utils";

    export let post: Post;

    const dateTime = formatRelativeTime(post.postDateTime);

    const likeCountLabel = abbreviateNumber(post.postEngagement.likes);
    const shareCountLabel = abbreviateNumber(post.postEngagement.shares);
    const commentCountLabel = abbreviateNumber(post.postEngagement.comments);
    const viewCountLabel = abbreviateNumber(post.postEngagement.views);

    const colorIndicator = post.platform === Platform.Mastodon ? "#563ACC" : "#4FB0FF";
</script>

<div class="flex flex-row grow h-full">
    <div class="w-2 h-auto" style="background-color: {colorIndicator}"></div>

    <div class="flex flex-row grow px-4 py-2 border-b-2 border-solid border-gray-100 hover:bg-gray-100">
        <img src="/pfp.svg" alt="Profile" class="w-14 h-14" />
        
        <div class="flex flex-col grow px-4 gap-y-1">
            <div class="flex flex-row items-center justify-between gap-4 min-w-0">
                <div class="flex flex-row shrink items-center gap-2 min-w-0">
                    <span class="text-base font-bold shrink min-w-0 line-clamp-1">{post.posterDisplayName}</span>
                    <span class="text-base font-light truncate min-w-0 line-clamp-1">{post.posterUsername}</span>
                    <span class="text-base font-light line-clamp-1"> ⋅ {dateTime}</span>
                </div>
                <div class="flex flex-row items-center gap-1">
                    <a class="underline text-xs font-extralight line-clamp-1 italic" href={post.originalPostLink}>via {post.platform}</a>
                </div>
            </div>

            <p class="w-auto text-base font-light text-current min-w-0">{@html post.postText}</p>

            <div class="flex flex-row justify-between min-w-0">
                <Button variant="ghost" class="p-0 gap-1 font-light text-slate-500 text-sm">
                    <Comment class="h-4 w-4"/>
                    {commentCountLabel}
                </Button>

                <Button variant="ghost" class="p-0 gap-1 font-light text-slate-500 text-sm">
                    <Like class="h-4 w-4"/>
                    {likeCountLabel}
                </Button>

                <Button variant="ghost" class="p-0 gap-1 font-light text-slate-500 text-sm">
                    <Share class="h-4 w-4"/>
                    {shareCountLabel}
                </Button>

                <Button variant="ghost" class="p-0 gap-1 font-light text-slate-500 text-sm">
                    <Views class="h-4 w-4"/>
                    {viewCountLabel}
                </Button>
            </div>
        </div>

        <Button size="icon" variant="ghost" class="h-6 w-6">
            <EllipsisVertical class="h-4 w-4"/>
        </Button>
    </div>
</div>