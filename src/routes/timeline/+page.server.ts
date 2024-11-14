import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { Platform, EmbedType, type Post, type PostEmbed } from "$lib/models/Post";

const maxLength = 10 //debug

export const load: PageServerLoad = async ({ cookies }) => {
    // return { posts: dummyPosts };
    // if ((!cookies.get("mastodonToken") || !cookies.get("mastodonId")) &&
    //     (!cookies.get("bskyToken") || !cookies.get("bskyDid")))
    //     redirect(308, "/")

    //process mastodon timeline
    async function getMastodonPosts(max_id?: string): Promise<Object[]> {
        if (!cookies.get("mastodonInstance"))
            return []
        const params: Record<string, string> = max_id ? {
            max_id,
            limit: "40"
        } : {
            limit: "40"
        }
        const url = `https://${cookies.get("mastodonInstance")}/api/v1/timelines/home?` + new URLSearchParams(params).toString()

        return await fetch(url, {
            headers: {
                "Authorization": `Bearer ${cookies.get("mastodonToken")}`
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

    let mastodonTimeline: Post[] = []
    let max_id: null | string = null
    while (mastodonTimeline.length < maxLength) {
        //get posts
        const mastodonPosts: Object[] = max_id ? await getMastodonPosts(max_id) : await getMastodonPosts()
        if (mastodonPosts.length === 0)
            break

        for (const post of mastodonPosts) {
            //do checks
            if (post.tags)
                console.log(post.tags)
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
                            href: embeds.url,
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
                    views: 0,
                },
                originalPostLink: post.url,
            })
        }
    }

    // process bluesky timeline
    async function getBlueskyPosts(cursor?: string): Promise<Object[]> {
        if (!cookies.get("bskyToken"))
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
                "Authorization": `Bearer ${cookies.get("bskyToken")}`
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

    let blueskyTimeline: Post[] = []
    let cursor: null | string = null
    while (blueskyTimeline.length < maxLength) {
        //get posts
        const blueskyFeed: Object[] = cursor ? await getBlueskyPosts(cursor) : await getBlueskyPosts()
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

            blueskyTimeline.push({
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

        cursor = blueskyFeed.cursor;
    }

    let timeline: Post[] = mastodonTimeline.concat(blueskyTimeline)
    //sort timeline
    timeline.sort((a: Post, b: Post): number => {
        if (a.postDateTime < b.postDateTime)
            return -1
        if (a.postDateTime > b.postDateTime)
            return 1
        return 0
    })

    return {
        posts: timeline
    }
};
