// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			//if anyone finds out how to make these an object, hmu
			mastodonCode : string | null
			mastodonUsername : string | null
			mastodonEmail : string | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
