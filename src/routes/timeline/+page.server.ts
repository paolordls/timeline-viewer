import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
export const load: PageServerLoad = async ({cookies}) => {
    if (!cookies.get("mastodonToken") || !cookies.get("mastodonId"))
        redirect(308, "/")

    
};