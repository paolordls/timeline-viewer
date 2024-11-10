<script>
    import Navbar from "$lib/components/ui/navbar.svelte";
    export let data;
    console.log(data);
    const userInfo = {
        mastodonHandle: data.mastodonUsername,
        mastodonDisplayName: data.mastodonAcct,
        mastodonInstance: data.mastodonInstance,
        bskyHandle: data.bskyHandle,
        bskyDisplayName: data.bskyDisplayName
    }
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<main>
    <Navbar userInfo={userInfo}/>
    <slot />
</main>