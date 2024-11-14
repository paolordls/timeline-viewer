<script lang="ts">
	import { type Variant, badgeVariants } from "./index.js";
	import { cn } from "$lib/utils.js";

	import LinkIcon from 'lucide-svelte/icons/link';
	import ImageIcon from 'lucide-svelte/icons/image';
	import GifIcon from 'lucide-svelte/icons/image-play';
	import VideoIcon from 'lucide-svelte/icons/video';
	import { FileMusic } from "lucide-svelte";	


	let className: string | undefined | null = undefined;
	export let href: string | undefined = undefined;
	export let variant: Variant = "default";
	export let iconType: string | undefined = undefined;
	export { className as class };

	let IconComponent;

	if (iconType === 'link') {
		IconComponent = LinkIcon;
	} else if (iconType === 'image') {
		IconComponent = ImageIcon;
	} else if (iconType === 'gif') {
		IconComponent = GifIcon;
	} else if (iconType === 'video') {
		IconComponent = VideoIcon;
	} else if (iconType === 'audio') {
		IconComponent = FileMusic;
	} else {
		IconComponent = undefined;
	}
</script>

<svelte:element
	this={href ? "a" : "span"}
	{href}
	class={cn(badgeVariants({ variant, className }))}
	{...$$restProps}
>
	<IconComponent class="h-3 w-3"/>

	<slot />
</svelte:element>
