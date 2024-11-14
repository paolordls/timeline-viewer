import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ cookies }) => {
    return {
        bskyToken: cookies.get("bskyToken"),
        mastodonToken: cookies.get("mastodonToken"),
        mastodonInstance: cookies.get("mastodonInstance"),
    }
};