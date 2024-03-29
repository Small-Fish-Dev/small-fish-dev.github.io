// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="@react2svelte/swipeable" />

import type { Member } from '$lib/types/Member';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		interface Route {
			label: string;
			icon: string;
			href: string;
		}

		interface MdsvexFile {
			default: import('svelte/internal').SvelteComponent;
			metadata: Record<string, string>;
		}

		type MdsvexResolver = () => Promise<MdsvexFile>;

		interface BlogPost {
			slug: string;
			title: string;
			thumbnail: string;
			date: string;
			description: string;
			publisher: string;
			published?: boolean;
			member?: Member;
		}
	}
}

export {};
