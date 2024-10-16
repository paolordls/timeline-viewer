import type { Post } from '$lib/models/Post';
import { Platform } from '$lib/models/Post';

const dummyPosts: Post[] = [
    {
      platform: Platform.Bluesky,
      posterDisplayName: "Paolo",
      posterUsername: "@paolo.bsky",
      postDateTime: new Date("2024-10-10T14:30:00"),
      postText: "I frickin <strong>love</strong> Software Engineering III. I'm super thrilled to learn about Mastodon and Bluesky.",
      postEmbeds: [],
      postHashtags: [],
      postEngagement: {
        likes: 120,
        shares: 45,
        comments: 15,
        views: 2102,
      },
      originalPostLink: "http://localhost:5173"
    },
    {
      platform: Platform.Mastodon,
      posterDisplayName: "Alice Smith",
      posterUsername: "@asm@mastodon.social",
      postDateTime: new Date("2024-10-09T09:15:00"),
      postText: "Mastodon is such a refreshing take on social media! I love decentralization and open web.",
      postEmbeds: ["https://example.com/img3.jpg"],
      postHashtags: ["Decentralization", "OpenWeb"],
      postEngagement: {
        likes: 95,
        shares: 32,
        comments: 18,
        views: 4500,
      },
      originalPostLink: "https://mastodon.social/@alicesmith/987654321"
    },
    {
      platform: Platform.Bluesky,
      posterDisplayName: "Jordan Techie",
      posterUsername: "@jordan.bsky",
      postDateTime: new Date("2024-10-08T11:45:00"),
      postText: "Exploring decentralized social networks. Bluesky has a lot of promise. #Web3 #Bluesky",
      postEmbeds: [],
      postHashtags: ["Web3", "Bluesky"],
      postEngagement: {
        likes: 72,
        shares: 22,
        comments: 12,
        views: 3200,
      },
      originalPostLink: "https://bsky.app/@jordan.bsky/87654321"
    },
    {
      platform: Platform.Mastodon,
      posterDisplayName: "Tech Enthusiast",
      posterUsername: "@techie@mastodon.social",
      postDateTime: new Date("2024-10-07T18:30:00"),
      postText: "The future of social media is here, and it’s open source! #MastodonRocks",
      postEmbeds: ["https://example.com/img4.jpg", "https://example.com/img5.jpg"],
      postHashtags: ["MastodonRocks", "OpenSource"],
      postEngagement: {
        likes: 150,
        shares: 50,
        comments: 25,
        views: 6100,
      },
      originalPostLink: "https://mastodon.social/@techenthusiast/123456789"
    }
];

/** @type {import('./$types').PageServerLoad} */    
export async function load() {
    return { posts: dummyPosts };
}