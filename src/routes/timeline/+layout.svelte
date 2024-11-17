<script>
    import Navbar from "$lib/components/ui/navbar.svelte";
    import { refreshing, refreshTimeline, timelineData } from "./timelineData";
    export let data;

    const userInfo = {
        mastodonPicture: data.mastodonPicture,
        mastodonHandle: data.mastodonUsername,
        mastodonDisplayName: data.mastodonAcct,
        mastodonInstance: data.mastodonInstance,
        mastodonPicture: data.mastodonPicture,
        bskyPicture: data.bskyPicture,
        bskyHandle: data.bskyHandle,
        bskyDisplayName: data.bskyDisplayName,
        bskyPicture: data.bskyPicture,
    }
    const catchRefreshClick = async () => {
        //temporarily set the timeline to be empty
        timelineData.set({
            mastodonTimeline: [],
            bskyTimeline: [],
            timeline: [],
        })
        refreshing.set(true)
        await timelineData.set(await refreshTimeline(data.mastodonToken, data.mastodonInstance, data.bskyToken))
        refreshing.set(false)
    }

    // const toggleMastodon = () => {
    //     isMastodonToggled = !isMastodonToggled;
    // }

    // const toggleBluesky = () => {
    //     isBlueskyToggled = !isBlueskyToggled;
    // }
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<main>
    <div class="min-h-screen bg-white flex justify-center">
        <!-- Main App Container -->
        <div class="w-full max-w-[700px] bg-white border-2 border-solid border-gray-100">
            <Navbar userInfo={userInfo} refreshFunction={catchRefreshClick}/>
            <slot/>
        </div>
    </div>
</main>