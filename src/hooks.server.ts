import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	if (dev) {
		const { miniflarePlatform } = await import('$lib/platform/miniflare');
		event.platform = await miniflarePlatform();
		return resolve(event);
	}

	return resolve(event);
}) satisfies Handle;
