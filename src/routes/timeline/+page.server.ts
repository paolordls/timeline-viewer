import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
export const load: PageServerLoad = async ({cookies}) => {
    if ((!cookies.get("mastodonToken") || !cookies.get("mastodonId")) &&
        (!cookies.get("bskyToken") || !cookies.get("bskyDid")))
        redirect(308, "/")

    
    //process mastodon timeline
    let mastodonTimeline : ArrayLike<Object> | Iterable<Object>
    if (cookies.get("mastodonToken") && cookies.get("mastodonId")) {
        console.log(cookies.get("mastodonToken"))
        await fetch("https://mastodon.social/api/v1/timelines/home", {
            headers: {
                "Authorization": `Bearer ${cookies.get("mastodonToken")}`
            }
        }).then(res => res.json())
        .then(res => mastodonTimeline = res)
        .catch(error => {
            //do something
            console.error(error)
        })
    }

    console.log(mastodonTimeline)

    return {
        mastodonTimeline
    }
};