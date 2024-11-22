import { SITE_URI, SECURE } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";

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

    //check if a mastodon code was provided
    if (locals.mastodonCode) {
        //get an access token
        const mastodonAccess = new FormData();
        mastodonAccess.append("client_id", cookies.get("mastodonClientId"))
        mastodonAccess.append("client_secret", cookies.get("mastodonClientSecret"))
        mastodonAccess.append("redirect_uri", SITE_URI)
        mastodonAccess.append("grant_type", "authorization_code")
        mastodonAccess.append("code", locals.mastodonCode)

        let accessToken : string | null = null
        await fetch("https://mastodon.social/oauth/token", {
            method: "POST",
            body: mastodonAccess
        })
            .then(res => res.json())
            .then(res => {
                accessToken = res.access_token
                return fetch("https://mastodon.social/api/v1/accounts/verify_credentials", { //verify access token
                headers: {
                    "Authorization": `Bearer ${res.access_token}`
                }
            })})
            .then(res => res.json())
            .then(res => {
                if (res.id) { //set if correct
                    cookies.set("mastodonToken", accessToken, { path: "/", ...(SECURE === "FALSE" && {secure: false}) })
                    cookies.set("mastodonId", res.id, { path: "/", ...(SECURE === "FALSE" && {secure: false}) })
                    userInfo = {
                        ...userInfo,
                        mastodonUsername: res.username,
                        mastodonAcct: res.acct,
                        mastodonDisplayName: res.display_name,
                        mastodonPicture: res.avatar_static,
                    }
                }
                else throw new Error("Access token is invalid.")
            })
            .catch(error => {
                //do something
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
    }

    // TO DO: check token expiry and refresh
    //  

    return {
        ...userInfo,
        mastodonInstance: cookies.get("mastodonInstance")
    }
};