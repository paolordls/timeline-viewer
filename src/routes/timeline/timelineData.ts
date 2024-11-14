
import { EmbedType, Platform, type Post, type PostEmbed } from "$lib/models/Post"
import { writable, type Writable } from "svelte/store"

const MAXLENGTH = 100
interface TimelineData {
    mastodonTimeline: Post[],
    bskyTimeline: Post[],
    timeline: Post[],
}

export let refreshing: Writable<boolean> = writable(false)
export let timelineData: Writable<TimelineData> = writable({
    mastodonTimeline: [],
    bskyTimeline: [],
    timeline: [],
})

export async function getMastodonPosts(token: string, instance: string, max_id?: string): Promise<Object[]> {
    if (!token)
        return []

    const params: Record<string, string> = max_id ? {
        max_id,
        limit: "40"
    } : {
        limit: "40"
    }
    const url = `https://${instance}/api/v1/timelines/home?` + new URLSearchParams(params).toString()

    return await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}` //mastodonToken
        }
    }).then(res => {
        if (!res.ok)
            throw new Error("Retrieval failed")
        return res.json()
    }).catch(error => {
        console.error(error.message)
        return []
    })
}

export async function getBlueskyPosts(token: string, cursor?: string): Promise<Object[]> {
    if (!token)
        return []

    const params: Record<string, string> = cursor ? {
        cursor,
        limit: "50"
    } : {
        limit: "50"
    }
    const url = `https://bsky.social/xrpc/app.bsky.feed.getTimeline?` + new URLSearchParams(params).toString()

    return await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}` //bskyToken
        }
    }).then(res => {
        if (!res.ok)
            throw new Error("Retrieval failed")
        return res.json()
    }).catch(error => {
        console.error(error.message)
        return []
    })
}

export const refreshTimeline = async (mastodonToken: string, mastodonInstance: string, bskyToken: string): Promise<TimelineData> => {
    let mastodonTimeline: Post[] = []
    let bskyTimeline: Post[] = []
    let max_id: null | string = null

    //handle mastodon posts
    while (mastodonTimeline.length < MAXLENGTH) {
        //get posts
        const mastodonPosts: any[] = max_id ? await getMastodonPosts(mastodonToken, mastodonInstance, max_id) : await getMastodonPosts(mastodonToken, mastodonInstance)
        if (mastodonPosts.length === 0)
            break

        for (const post of mastodonPosts) {
            //do checks
            max_id = post.id
            if (post.in_reply_to_id || //is a reply
                post.reblog || //reblog
                (post.content == "" && post.media_attachments.length == 0) //no content and no embeds
            )
                continue

            //handle embeds
            let embeds: PostEmbed[] = []
            let counts = {
                image: 0, //TODO: pull filename of embeds
                file: 0,
                video: 0
            }
            for (const embed of post.media_attachments) {
                switch (embed.type) {
                    case 'image':
                        embeds.push({
                            href: embed.url,
                            title: `Image ${counts.image}`,
                            type: EmbedType.Image
                        })
                        counts.image++
                        break;
                }
            }

            //handle hashtags
            let hashtags: string[] = []
            for (const tag of post.tags)
                hashtags.push(tag.name)

            mastodonTimeline.push({
                platform: Platform.Mastodon,
                posterDisplayName: post.account.display_name,
                posterUsername: post.account.username,
                posterProfilePicture: post.account.avatar,
                postDateTime: new Date(post.created_at),
                postText: post.content,
                postEmbeds: embeds,  // URLs to embedded media
                postHashtags: hashtags, // Only for Mastodon
                postEngagement: {
                    likes: post.favourites_count,
                    shares: post.reblogs_count,
                    comments: post.replies_count,
                },
                originalPostLink: post.url,
            })
        }
    }

    //handle bsky posts
    max_id = null
    while (bskyTimeline.length < MAXLENGTH) {
        //get posts
        const blueskyFeed: any[] = max_id ? await getBlueskyPosts(bskyToken, max_id) : await getBlueskyPosts(bskyToken)
        // console.log(blueskyFeed);
        if (blueskyFeed.length === 0)
            break

        for (const post of blueskyFeed.feed) {
            //do checks
            if (post.reply || //is a reply
                post.reason || //repost
                (post.post.record == "" && post.post.embed.length == 0) //no content and no embeds
            )
                continue

            bskyTimeline.push({
                platform: Platform.Bluesky,
                posterDisplayName: post.post.author.displayName,
                posterUsername: post.post.author.handle,
                posterProfilePicture: post.post.author.avatar,
                postDateTime: new Date(post.post.record.createdAt),
                postText: post.post.record.text,
                // postEmbeds: post.post.embed,  // URLs to embedded media
                postEmbeds: [],
                postHashtags: [], // Only for Mastodon
                postEngagement: {
                    likes: post.post.likeCount,
                    shares: post.post.repostCount,
                    comments: post.post.replyCount,
                },
                originalPostLink: '',
            })
        }

        max_id = blueskyFeed.cursor;
    }

    let timeline: Post[] = mastodonTimeline.concat(bskyTimeline)
    //sort timeline
    timeline.sort((a: Post, b: Post): number => {
        if (a.postDateTime > b.postDateTime)
            return -1
        if (a.postDateTime < b.postDateTime)
            return 1
        return 0
    })

    return {
        mastodonTimeline,
        bskyTimeline,
        timeline
    }
} 