export enum Platform {
    Mastodon = "Mastodon",
    Bluesky = "Bluesky",
};

export enum EmbedType {
    Link = "link",
    Gif = "gif",
    Video = "video",
    Image = "image",
    None = "none",
}
  
export interface Post {
    platform: Platform;
    posterDisplayName: string;
    posterUsername: string;
    postDateTime: Date;
    postText: string;
    postEmbeds: PostEmbed[];  // URLs to embedded media
    postHashtags: string[]; // Only for Mastodon
    postEngagement: {
        likes: number;
        shares: number;
        comments: number;
        views: number;
    };
    originalPostLink: string;
};

interface PostEmbed {
    href: string,
    title: string,
    type: EmbedType
}