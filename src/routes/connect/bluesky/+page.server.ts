import type { Actions } from "@sveltejs/kit";

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
} satisfies Actions;