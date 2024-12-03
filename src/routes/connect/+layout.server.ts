import { SITE_URI, SECURE } from '$env/static/private';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, cookies }) => {
    //check if a mastodon code was provided
    let userInfo = {}
    if (locals.mastodonCode) {
        //get an access token
        const mastodonAccess = new FormData();
        mastodonAccess.append("client_id", cookies.get("mastodonClientId"))
        mastodonAccess.append("client_secret", cookies.get("mastodonClientSecret"))
        mastodonAccess.append("redirect_uri", SITE_URI)
        mastodonAccess.append("grant_type", "authorization_code")
        mastodonAccess.append("code", locals.mastodonCode)

        let accessToken: string | null = null
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
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.id) { //set if correct
                    cookies.set("mastodonToken", accessToken, { path: "/", ...(SECURE === "FALSE" && { secure: false }) })
                    cookies.set("mastodonId", res.id, { path: "/", ...(SECURE === "FALSE" && { secure: false }) })
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
    return {
        ...userInfo,
        mastodonInstance: cookies.get("mastodonInstance")
    }
}