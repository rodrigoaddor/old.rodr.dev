import { Miniflare } from 'miniflare';

export const miniflarePlatform = async (): Promise<App.Platform> => {
	const miniflare = new Miniflare({
		kvPersist: '.kv',
		kvNamespaces: ['ALIASES'],
		globalAsyncIO: true,
		globalTimers: true,
		globalRandom: true,
		envPath: '.env',
		script: `
			addEventListener("fetch", (event) => {
				event.waitUntil(Promise.resolve(event.request.url));
				event.respondWith(new Response(event.request.headers.get("X-Message")));
			});
			addEventListener("scheduled", (event) => {
				event.waitUntil(Promise.resolve(event.scheduledTime));
			});
			`
	});

	const env = await miniflare.getBindings();
	const caches = await miniflare.getCaches();

	return {
		env,
		caches
	} as unknown as App.Platform;
};
