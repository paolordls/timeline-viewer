import { SITE_URI, SECURE } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";
import { refreshBskyToken } from '$lib/bluesky';

export const load: PageServerLoad = async ({ route, locals, cookies }) => {
    if (cookies.get("LoggedIn") !== "True" && route.id !== "/login")
        redirect(303, "/login")

    //check if the cookie is set before checking the code
    //so it only works once
    let userInfo = {}
    if (cookies.get("mastodonToken") && cookies.get("mastodonId")) {
        await fetch(`https://mastodon.social/api/v1/accounts/${cookies.get("mastodonId")}`, {
            headers: {
                "Authorization": `Bearer ${cookies.get("mastodonToken")}`
            }
        })
            .then(res => res.json())
            .then(res => {
                userInfo = {
                    ...userInfo,
                    mastodonUsername: res.username,
                    mastodonAcct: res.acct,
                    mastodonDisplayName: res.display_name,
                    mastodonPicture: res.avatar_static,
                }
            })
            .catch(error => {
                console.error(error)
            })
    }

    // BLUESKY

    //check if the cookie is set before checking the code
    //so it only works once
    if (cookies.get("bskyToken") && cookies.get("bskyDid")) {
        await fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${cookies.get("bskyDid")}`, {
        })
            .then(res => res.json())
            .then(res => {
                userInfo = {
                    ...userInfo,
                    bskyDid: res.did,
                    bskyHandle: res.handle,
                    bskyDisplayName: res.displayName,
                    bskyPicture: res.avatar
                }
            })
            .catch(error => {
                console.error(error)
            })

        // check and refresh bsky token
        const bskyTokens = await refreshBskyToken(cookies.get("bskyToken"), cookies.get("bskyRefreshToken"))
        if (bskyTokens.status === "refreshed") {
            cookies.set("bskyToken", bskyTokens.token, { path: "/", httpOnly: true, secure: true, maxAge: 172800 })
            cookies.set("bskyRefreshToken", bskyTokens.refreshToken, { path: "/", httpOnly: true, secure: true, maxAge: 172800 })
        }

        console.log(`token status: ${bskyTokens.status}`)
    }

    return {
        ...userInfo,
        mastodonInstance: cookies.get("mastodonInstance")
    }
};