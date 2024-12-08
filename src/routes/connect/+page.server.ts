import { SITE_URI, SECURE } from '$env/static/private';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals, cookies }) => {
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
}

/** @type {import('./$types').Actions} */
export const actions = {
    mastodon: async ({ request, cookies }) => {
        const formData = await request.formData();
        const instance = String(formData.get('instance'))
        let failure: null | string = null
        let redirecturl: null | string = null
        console.error(`instance: ${instance}`)

        //register app to instance
        const appRegisterData = new FormData();
        appRegisterData.append("client_name", "timeline-viewer")
        appRegisterData.append("redirect_uris[]", "http://localhost:5173/connect") //local testing
        appRegisterData.append("redirect_uris[]", "https://timeline-viewer-seven.vercel.app/connect") //production
        appRegisterData.append("redirect_uris[]", "https://timeline-viewer-git-dev-jrdelossantos-upeduphs-projects.vercel.app/connect") //staging
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

<<<<<<< HEAD
                cookies.set("mastodonClientId", id, { path: "/", ...(SECURE === "FALSE" && { secure: false }) })
                cookies.set("mastodonClientSecret", secret, { path: "/", ...(SECURE === "FALSE" && { secure: false }) })
                cookies.set("mastodonInstance", instance, { path: "/", ...(SECURE === "FALSE" && { secure: false }) })
            }).catch(error => {
                failure = error.message
            })
=======
            cookies.set("mastodonClientId", id, { path: "/", ...(SECURE === "FALSE" && {secure: false}) })
            cookies.set("mastodonClientSecret", secret, { path: "/", ...(SECURE === "FALSE" && {secure: false}) })
            cookies.set("mastodonInstance", instance, { path: "/", ...(SECURE === "FALSE" && {secure: false}) })
        }).catch(error => {
            failure = error.message
        })
>>>>>>> main

        if (failure)
            return fail(400, {
                error: {
                    platform: "mastodon",
                    message: failure
                }
            })

        if (typeof redirecturl === 'string')
            throw redirect(303, redirecturl)
        else
            return fail(401, {
                error: {
                    platform: "mastodon",
                    message: "Redirect is invalid"
                }
            })
    },
    bluesky: async ({ request, cookies }) => {
        const formData = await request.formData();
        const handle = String(formData.get('handle'))

        // get user Did using bsky handle
        const res = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${handle}`);
        const profile = await res.json();
        if (profile.error)
            return fail(401, {
                error: {
                    platform: "bluesky",
                    message: profile.message
                }
            })

        const bskyAccess = {
            "identifier": profile.did,
            "password": String(formData.get('password')),
        }

        // request access token
        await fetch("https://bsky.social/xrpc/com.atproto.server.createSession", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bskyAccess)
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                if (res.did) { //set if correct
                    cookies.set("bskyToken", res.accessJwt, { path: "/", httpOnly: true, maxAge: 172800, ...(SECURE === "FALSE" && { secure: false }) })
                    cookies.set("bskyRefreshToken", res.refreshJwt, { path: "/", httpOnly: true, maxAge: 172800, ...(SECURE === "FALSE" && { secure: false }) })
                    cookies.set("bskyDid", res.did, { path: "/", httpOnly: true, maxAge: 604800, ...(SECURE === "FALSE" && { secure: false }) })
                } else if (res.error)
                    return fail(401, {
                        error: {
                            platform: "bluesky",
                            message: res.message
                        }
                    })
                else return fail(401, {
                    error: {
                        platform: "bluesky",
                        message: "Access token is invalid."
                    }
                })
            })
            .catch(error => {
                //do something
                return fail(401, {
                    error: {
                        platform: "bluesky",
                        message: error.message
                    }
                })
            })

    }
} satisfies Actions;