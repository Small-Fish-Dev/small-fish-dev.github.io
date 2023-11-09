// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
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
			author: string;
			description: string;
			date: string;
			published: boolean;
		}
	}
}

export {};
