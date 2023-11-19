// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="@react2svelte/swipeable" />
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
			date: string;
			description: string;
			published: boolean;
			publisher: string;
		}
	}
}

export {};
