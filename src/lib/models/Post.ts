export enum Platform {
    Mastodon = "Mastodon",
    Bluesky = "Bluesky",
};

export enum EmbedType {
    Audio = "audio",
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
    posterProfilePicture: string;
    postDateTime: Date;
    postText: string;
    postEmbeds: PostEmbed[];  // URLs to embedded media
    postHashtags: Hashtag[]; // Only for Mastodon
    postEngagement: {
        likes: number;
        shares: number;
        comments: number;
    };
    originalPostLink: string;
};

export interface PostEmbed {
    href: string,
    title: string,
    type: EmbedType
}

export interface Hashtag {
    name: string,
    url: string
}