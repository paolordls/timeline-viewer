import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { Platform, EmbedType, type Post,  } from "$lib/models/Post";

const dummyPosts: Post[] = [
    {
      platform: Platform.Bluesky,
      posterDisplayName: "Paolo",
      posterUsername: "@paolo.bsky",
      postDateTime: new Date("2024-10-10T14:30:00"),
      postText: "I frickin <strong>love</strong> Software Engineering III. I'm super thrilled to learn about Mastodon and Bluesky.",
      postEmbeds: [
        { 
            href: "https://example.com/article",
            title: "A Guide to Decentralized Social Media",
            type: EmbedType.Link,
        }
      ],
      postHashtags: ["ComputerScience", "IAmAGoodSoftwareEngineer"],
      postEngagement: {
        likes: 120,
        shares: 45,
        comments: 15,
      },
      originalPostLink: "http://localhost:5173"
    },
    {
      platform: Platform.Mastodon,
      posterDisplayName: "Alice Smith",
      posterUsername: "@asm@mastodon.social",
      postDateTime: new Date("2024-10-09T09:15:00"),
      postText: "Mastodon is such a refreshing take on social media! I love decentralization and open web.",
      postEmbeds: [
        { 
            href: "https://example.com/img3.jpg",
            title: "Decentralization Graphic",
            type: EmbedType.Image,
        }
      ],
      postHashtags: [],
      postEngagement: {
        likes: 95,
        shares: 32,
        comments: 18,
      },
      originalPostLink: "https://mastodon.social/@alicesmith/987654321"
    },
    {
      platform: Platform.Bluesky,
      posterDisplayName: "Jordan Techie",
      posterUsername: "@jordan.bsky",
      postDateTime: new Date("2024-10-08T11:45:00"),
      postText: "Exploring decentralized social networks. Bluesky has a lot of promise.",
      postEmbeds: [
        {
            href: "https://example.com/video.mp4",
            title: "Bluesky Introduction",
            type: EmbedType.Video,
        }
      ],
      postHashtags: ["Web3", "Bluesky"],
      postEngagement: {
        likes: 72,
        shares: 22,
        comments: 12,
      },
      originalPostLink: "https://bsky.app/@jordan.bsky/87654321"
    },
    {
      platform: Platform.Mastodon,
      posterDisplayName: "Tech Enthusiast",
      posterUsername: "@techie@mastodon.social",
      postDateTime: new Date("2024-10-07T18:30:00"),
      postText: "The future of social media is here, and it’s open source!",
      postEmbeds: [
        {
            href: "https://example.com/img4.jpg",
            title: "Open Source Social Media",
            type: EmbedType.Image,
        },
        {
            href: "https://example.com/img5.jpg",
            title: "Decentralized Platforms",
            type: EmbedType.Image,
        }
      ],
      postHashtags: [],
      postEngagement: {
        likes: 150,
        shares: 50,
        comments: 25,
      },
      originalPostLink: "https://mastodon.social/@techenthusiast/123456789"
    },
    {
      platform: Platform.Bluesky,
      posterDisplayName: "Sam Dev",
      posterUsername: "@samdev.bsky",
      postDateTime: new Date("2024-10-05T10:00:00"),
      postText: "Testing out GIFs on Bluesky, can't believe it's this smooth!",
      postEmbeds: [
        {
            href: "https://example.com/animation.gif",
            title: "Funny Coding Meme",
            type: EmbedType.Gif,
        }
      ],
      postHashtags: [],
      postEngagement: {
        likes: 80,
        shares: 15,
        comments: 10,
      },
      originalPostLink: "https://bsky.app/@samdev.bsky/12345678"
    }
];


export async function load() {
    return { posts: dummyPosts };
}

// export const load: PageServerLoad = async ({cookies}) => {
//     return { posts: dummyPosts };
//     if ((!cookies.get("mastodonToken") || !cookies.get("mastodonId")) &&
//         (!cookies.get("bskyToken") || !cookies.get("bskyDid")))
//         redirect(308, "/")

//     //process mastodon timeline
//     async function getMastodonPosts(max_id? : string) : Promise<Object[]> {
//         const params : Record<string, string> = max_id ? {
//             max_id,
//             limit: "40"
//         } : {
//             limit: "40"
//         }
//         const url = `https://${cookies.get("mastodonInstance")}/api/v1/timelines/home?` + new URLSearchParams(params).toString() 

//         return await fetch(url, {
//             headers: {
//                 "Authorization": `Bearer ${cookies.get("mastodonToken")}`
//             }
//         }).then(res => {
//             if (!res.ok)
//                 throw new Error("Retrieval failed")
//             return res.json()
//         }).catch(error => {
//             console.error(error.message)
//             return []
//         })
//     }
    
//     let mastodonTimeline : Post[] = []
//     let max_id : null | string = null
//     while (mastodonTimeline.length < 100) {
//         //get posts
//         const mastodonPosts : Object[] = max_id ? await getMastodonPosts(max_id) : await getMastodonPosts()
//         if (mastodonPosts.length === 0)
//             break

//         for (const post of mastodonPosts) {
//             //do checks
//             max_id = post.id
//             if (post.in_reply_to_id || //is a reply
//                 post.reblog || //reblog
//                 (post.content == "" && post.media_attachments.length == 0) //no content and no embeds
//             ) 
//                 continue 
            
//             mastodonTimeline.push({
//                 platform: Platform.Mastodon,
//                 posterDisplayName: post.account.display_name,
//                 posterUsername: post.account.username,
//                 postDateTime: new Date(post.created_at),
//                 postText: post.content,
//                 postEmbeds: post.media_attachments,  // URLs to embedded media
//                 postHashtags: post.tags, // Only for Mastodon
//                 postEngagement: {
//                     likes: post.favourites_count,
//                     shares: post.reblogs_count,
//                     comments: post.replies_count,
//                     views: 0,
//                 },
//                 originalPostLink: post.url,
//             })
//         }
//     }

//     //sort timeline

//     return {
//         mastodonTimeline
//     }
// };
