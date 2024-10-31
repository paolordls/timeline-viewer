<script lang="ts">
    import { Platform, type Post } from "$lib/models/Post";
    import { formatRelativeTime } from "$lib/utils";
    import { IconBadge } from "$lib/components/ui/iconbadge/index.js";
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

<div class="flex flex-row w-full">
    <div class="w-2 h-auto" style="background-color: {colorIndicator}"></div>

    <div class="flex flex-row w-full border-b-2 px-4 py-2 border-solid border-gray-100 hover:bg-gray-100">
        <img src="/pfp.svg" alt="Profile" class="w-14 h-14" />

        <div class="flex flex-col pl-4 gap-y-1 w-full">
            <div class="flex flex-row w-full place-content-between">
                <div class="flex flex-row gap-x-2 flex-wrap">
                    <div class="text-base font-bold">{post.posterDisplayName}</div>

                    <div class="text-sm font-light text-gray-500 line-clamp-1 self-center">{post.posterUsername} ⋅ {dateTime}</div>
                </div>
                <div>
                    <Button size="icon" variant="ghost" class="h-6 w-6">
                        <EllipsisVertical class="h-4 w-4"/>
                    </Button>
                </div>
            </div>

            <p class="w-auto text-base font-light text-current min-w-0">{@html post.postText}</p>

            <div class="flex flex-row flex-wrap gap-1 w-50">
                {#each post.postEmbeds as embed}
                    <IconBadge href={embed.href} variant="secondary" iconType={embed.type}>
                        {embed.title}
                    </IconBadge>
                {/each}
                
            </div>
        </div>
    </div>
</div>