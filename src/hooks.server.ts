import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === "/" && event.url.searchParams.has("code")) {
        event.locals.mastodonCode = event.url.searchParams.get("code")
    }

    if (event.url.pathname === "/logoutKaleido") {
        event.cookies.delete("LoggedIn", { path: "/" })
        redirect(303, "/login")
    }

    if (event.url.pathname === "/logoutMastodon") {
        event.cookies.delete("mastodonToken", { path: "/" })
        event.cookies.delete("mastodonId", { path: "/" })
        redirect(303, "/connect/mastodon")
    }

    if (event.url.pathname === "/logoutBluesky") {
        event.cookies.delete("bskyToken", { path: "/" })
        event.cookies.delete("bskyRefreshToken", { path: "/" })
        event.cookies.delete("bskyDid", { path: "/" })
        redirect(303, "/connect/bluesky")

        // TO DO: delete session
    }

	const response = await resolve(event);
	return response;
};