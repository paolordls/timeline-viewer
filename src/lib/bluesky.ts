async function isBskyTokenActive(token: string): Promise<Boolean> {
    return await fetch('https://bsky.social/xrpc/com.atproto.server.getSession', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(res => res.json())
    .then(res => {
        if (res.active)
            return true
        else if (res.error == "ExpiredToken")
            return false
        else
            throw new Error(res.error);
    })
}

export async function refreshBskyToken(token: string, refreshToken: string){
    try {
        const isActive = await isBskyTokenActive(token)

        if (isActive)
            return { status: "active" }
        else {
            // refresh tokens
            const res = await fetch('https://bsky.social/xrpc/com.atproto.server.refreshSession', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${refreshToken}`
                }
            })
            const newTokens = await res.json()

            if (newTokens.error)
                throw new Error(newTokens.error)

            console.log(newTokens)
            console.log(`new tokens: ${newTokens.accessJwt} ${newTokens.refreshJwt}`)
            return { status: "refreshed", token: newTokens.accessJwt, refreshToken: newTokens.refreshJwt }
        }
    } catch (e){
        console.error(e)
        return { status: "failed"}
    }
}