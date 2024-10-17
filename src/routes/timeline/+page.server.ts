import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { Platform, type Post } from "$lib/models/Post";

export const load: PageServerLoad = async ({cookies}) => {
    if ((!cookies.get("mastodonToken") || !cookies.get("mastodonId")) &&
        (!cookies.get("bskyToken") || !cookies.get("bskyDid")))
        redirect(308, "/")

    //process mastodon timeline
    async function getMastodonPosts(max_id? : string) : Promise<Object[]> {
        const params : Record<string, string> = max_id ? {
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
    
    let mastodonTimeline : Post[] = []
    let max_id : null | string = null
    while (mastodonTimeline.length < 100) {
        //get posts
        const mastodonPosts : Object[] = max_id ? await getMastodonPosts(max_id) : await getMastodonPosts()
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
            
            mastodonTimeline.push({
                platform: Platform.Mastodon,
                posterDisplayName: post.account.display_name,
                posterUsername: post.account.username,
                postDateTime: new Date(post.created_at),
                postText: post.content,
                postEmbeds: post.media_attachments,  // URLs to embedded media
                postHashtags: post.tags, // Only for Mastodon
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

    //sort timeline

    return {
        mastodonTimeline
    }
};