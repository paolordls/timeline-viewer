import { MASTODON_CLIENT_ID, MASTODON_CLIENT_SECRET, SITE_URI } from '$env/static/private';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, cookies }) => {
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
                    mastodonDisplayName: res.display_name
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
        mastodonAccess.append("client_id", MASTODON_CLIENT_ID)
        mastodonAccess.append("client_secret", MASTODON_CLIENT_SECRET)
        mastodonAccess.append("redirect_uri", SITE_URI)
        mastodonAccess.append("grant_type", "authorization_code")
        mastodonAccess.append("code", locals.mastodonCode)

        await fetch("https://mastodon.social/oauth/token", {
            method: "POST",
            body: mastodonAccess
        })
            .then(res => res.json())
            .then(res => fetch("https://mastodon.social/api/v1/accounts/verify_credentials", { //verify access token
                headers: {
                    "Authorization": `Bearer ${res.access_token}`
                }
            }))
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.id) { //set if correct
                    cookies.set("mastodonToken", res.access_token, { path: "/" })
                    cookies.set("mastodonId", res.id, { path: "/" })
                    userInfo = {
                        ...userInfo,
                        mastodonUsername: res.username,
                        mastodonAcct: res.acct,
                        mastodonDisplayName: res.display_name
                    }
                }
                else throw new Error("Access token is invalid.")
            })
            .catch(error => {
                //do something
                console.error(error)
            })
    }

    return {
        ...userInfo
    }
};