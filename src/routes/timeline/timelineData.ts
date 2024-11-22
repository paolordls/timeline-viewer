
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
            throw new Error(res.statusText)
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
            throw new Error(res.statusText)
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
            let imageCount = 1
            for (const embed of post.media_attachments) {
                switch (embed.type) {
                    case 'image':
                        embeds.push({
                            href: embed.url,
                            title: `Image ${imageCount}`,
                            type: EmbedType.Image
                        })
                        imageCount++
                        break;
                    case 'video':
                        embeds.push({
                            href: embed.url,
                            title: `Video`,
                            type: EmbedType.Video
                        })
                        break
                    case 'gifv':
                        embeds.push({
                            href: embed.url,
                            title: `Gif`,
                            type: EmbedType.Gif
                        })
                        break
                    case 'audio':
                        embeds.push({
                            href: embed.url,
                            title: `Audio`,
                            type: EmbedType.Audio
                        })
                        break
                }
            }

            //handle hashtags

            mastodonTimeline.push({
                platform: Platform.Mastodon,
                posterDisplayName: post.account.display_name,
                posterUsername: post.account.username,
                posterProfilePicture: post.account.avatar,
                postDateTime: new Date(post.created_at),
                postText: post.content,
                postEmbeds: embeds,  // URLs to embedded media
                postHashtags: post.tags, // Only for Mastodon
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

            //get the url from the at-uri
            const ATURI = post.post.uri.split('/')
            const RKEY = ATURI.at(-1)
            const DID = ATURI.at(-3)
            const profile = post.post.author.handle.split('.')
            const postURL = `https://bsky.app/profile/${DID}/post/${RKEY}`

            //handle embeds
            let embeds: PostEmbed[] = []
            let imageCount = 1
            if (post.post.embed){
            if (post.post.embed.images) {
                for (const image of post.post.embed.images) {
                    embeds.push({
                        href: postURL,
                        title: `Video`,
                        type: EmbedType.Video
                    })
                }
            }
            else if (post.post.embed.external) {
                embeds.push({
                    href: postURL,
                    title: `External link`,
                    type: EmbedType.Link
                })
            }
            else if (post.post.embed.thumbnail) {
                embeds.push({
                    href: postURL,
                    title: `Video`,
                    type: EmbedType.Video
                })
            }
            else if (post.post.embed.external) {
                embeds.push({
                    href: postURL,
                    title: `External link`,
                    type: EmbedType.Link
                })
            }}

            bskyTimeline.push({
                platform: Platform.Bluesky,
                posterDisplayName: post.post.author.displayName,
                posterUsername: post.post.author.handle,
                posterProfilePicture: post.post.author.avatar,
                postDateTime: new Date(post.post.record.createdAt),
                postText: post.post.record.text,
                postEmbeds: embeds,
                postHashtags: [], // Only for Mastodon
                postEngagement: {
                    likes: post.post.likeCount,
                    shares: post.post.repostCount,
                    comments: post.post.replyCount,
                },
                originalPostLink: postURL,
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