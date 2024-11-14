import type { PageServerLoad } from "../$types";
import { refreshTimeline } from "./timelineData";

export const load: PageServerLoad = async ({ cookies }) => {
    return {
        timelineData: await refreshTimeline(cookies.get("mastodonToken"), cookies.get("mastodonInstance"), cookies.get("bskyToken"))
    }
};