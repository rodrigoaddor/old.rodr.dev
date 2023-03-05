import type { KVNamespace } from '@cloudflare/workers-types';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}

		interface Platform {
			env: {
				ALIASES: KVNamespace;
				ADMIN_TOKEN: string;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}
