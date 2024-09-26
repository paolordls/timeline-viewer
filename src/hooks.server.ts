import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === "/" && event.url.searchParams.has("code")) {
        event.locals.mastodonCode = event.url.searchParams.get("code")
    }

    if (event.url.pathname === "/logoutMastodon") {
        event.cookies.delete("mastodonToken", { path: "/" })
        event.cookies.delete("mastodonId", { path: "/" })
        redirect(303, "/")
    }

	const response = await resolve(event);
	return response;
};