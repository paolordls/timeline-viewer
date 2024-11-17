import type { PageServerLoad } from "../$types";
import { refreshTimeline } from "./timelineData";
import { refreshBskyToken } from '$lib/bluesky'

export const load: PageServerLoad = async ({ cookies }) => {
    // check and refresh bsky token before requesting data
    if (cookies.get("bskyToken") && cookies.get("bskyDid")) {
        const bskyTokens = await refreshBskyToken(cookies.get("bskyToken"), cookies.get("bskyRefreshToken"))
        if (bskyTokens.status === "refreshed"){
            cookies.set("bskyToken", bskyTokens.token, { path: "/", httpOnly: true, secure: true, maxAge: 172800 })
            cookies.set("bskyRefreshToken", bskyTokens.refreshToken, { path: "/", httpOnly: true, secure: true, maxAge: 172800 })
        } 

        console.log(`token status: ${bskyTokens.status}`)
    }

    return {
        timelineData: await refreshTimeline(cookies.get("mastodonToken"), cookies.get("mastodonInstance"), cookies.get("bskyToken"))
    }
};