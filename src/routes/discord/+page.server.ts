import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(302, 'https://discord.gg/rx2qqTqv36');
}
