export enum Platform {
    Mastodon = "Mastodon",
    Bluesky = "Bluesky",
};
  
export interface Post {
    platform: Platform;
    posterDisplayName: string;
    posterUsername: string;
    postDateTime: Date;
    postText: string;
    postEmbeds: string[];  // URLs to embedded media
    postHashtags: string[]; // Only for Mastodon
    postEngagement: {
        likes: number;
        shares: number;
        comments: number;
        views: number;
    };
    originalPostLink: string;
};