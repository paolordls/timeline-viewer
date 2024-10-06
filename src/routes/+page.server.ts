import { MASTODON_CLIENT_ID, MASTODON_CLIENT_SECRET, SITE_URI } from '$env/static/private';
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
        redirect_uri: SITE_URI
    }).toString()

    return {
        mastodonLoginLink
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const handle = String(formData.get('handle'))
        // console.log(handle)

        // get user Did using bsky handle
        const res = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${handle}`);
        const profile = await res.json();
        
        const bskyAccess = {
            "identifier": profile.did, 
			"password": String(formData.get('password')), 
        }
        // console.log(bskyAccess);

        // request access token
        await fetch("https://bsky.social/xrpc/com.atproto.server.createSession", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bskyAccess)
        }).then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.did) { //set if correct
                cookies.set("bskyToken", res.accessJwt, { path: "/" })
                cookies.set("bskyRefreshToken", res.refreshJwt, { path: "/" })
                cookies.set("bskyDid", res.did, { path: "/" })
            }
            else throw new Error("Access token is invalid.")
        })
        .catch(error => {
            //do something
            console.error(error)
        })
		
	}
};