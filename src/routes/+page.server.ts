import { MASTODON_CLIENT_ID, MASTODON_CLIENT_SECRET, MASTODON_REDIRECT_URI } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({locals, cookies}) => {
    // const mastodonAccess = new FormData();
    // mastodonAccess.append("client_id", MASTODON_CLIENT_ID)
    // mastodonAccess.append("client_secret", MASTODON_CLIENT_SECRET)
    // mastodonAccess.append("redirect_uri", "urn:ietf:wg:oauth:2.0:oob")
    // mastodonAccess.append("grant_type", "client_credentials")

    // //get access token
    // let accessResponse = await fetch("https://mastodon.social/oauth/token", {
    //     method: "POST",
    //     body: mastodonAccess    
    // }).then(res => res.json())

    // //double check if access token is okay
    // await fetch("https://mastodon.social/api/v1/apps/verify_credentials", {
    //     headers: {
    //         "Authorization": `Bearer ${accessResponse.access_token}`
    //     }
    // }).then(res => res.json())
    //     .then(res => {
    //         if (!res.id)
    //             throw new Error("Access token is invalid.")
    //     })

    //create link for mastodon login
    let mastodonLoginLink = "https://mastodon.social/oauth/authorize?" + new URLSearchParams({
        client_id: MASTODON_CLIENT_ID,
        response_type: "code",
        redirect_uri: MASTODON_REDIRECT_URI
    }).toString()

    return {
        mastodonLoginLink
    }
}