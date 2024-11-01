import { SITE_URI } from '$env/static/private';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    if (cookies.get("LoggedIn") === "True")
        redirect(303, "/login/success")
}

/** @type {import('./$types').Actions} */
export const actions = {
    mastodon: async ({ request, cookies}) => {
        const formData = await request.formData();
        const instance = String(formData.get('instance'))
        let failure : null | string = null
        let redirecturl : null | string = null
        console.log(`instance: ${instance}`)

        //register app to instance
        const appRegisterData = new FormData();
        appRegisterData.append("client_name", "timeline-viewer")
        appRegisterData.append("redirect_uris[]", "http://localhost:5173") //local testing
        appRegisterData.append("redirect_uris[]", "https://timeline-viewer-seven.vercel.app") //production
        appRegisterData.append("redirect_uris[]", "https://timeline-viewer-git-dev-jrdelossantos-upeduphs-projects.vercel.app") //staging
        appRegisterData.append("website", "https://timeline-viewer-seven.vercel.app")


        await fetch(`https://${instance}/api/v1/apps`, 
        {
            method: "POST",
            body: appRegisterData
        }).then(res => {
            if (!res.ok) {
                throw new Error("Either instance URL is invalid or instance is currently down.")
            }

            return res.json()
        }).then(res => {
            //now have client id and client secret, 
            console.log(res)
            const id = res.client_id
            const secret = res.client_secret
            redirecturl = `https://${instance}/oauth/authorize?` + new URLSearchParams({
                client_id: id,
                response_type: "code",
                redirect_uri: SITE_URI
            }).toString()

            cookies.set("mastodonClientId", id, { path: "/" })
            cookies.set("mastodonClientSecret", secret, { path: "/" })
            cookies.set("mastodonInstance", instance, {path: "/"})
            throw redirect(303, "/connect/bluesky")
        }).catch(error => {
            failure = error.message
        })

        if (failure)
            return fail(400, {
                error: failure
            })

        if (typeof redirecturl === 'string')
            throw redirect(303, redirecturl)
        else
            return fail(401, {
                error: "redirect invalid"
            })
    },
	bluesky: async ({ request, cookies }) => {
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
                throw redirect(303, "/connect/bluesky")
            }
            else throw new Error("Access token is invalid.")
        })
        .catch(error => {
            //do something
            console.error(error)
        })
		
	}
} satisfies Actions;