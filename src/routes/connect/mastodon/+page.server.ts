import { SITE_URI } from "$env/static/private";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions = {
    default: async ({ request, cookies}) => {
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
    }
} satisfies Actions