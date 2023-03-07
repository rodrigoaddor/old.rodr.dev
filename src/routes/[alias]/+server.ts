import { isAuthorized } from '$lib/utils/authorization';
import status from 'http-status';
import type { RequestHandler } from './$types';

export const GET = (async ({ url, params, platform }) => {
	if (!platform) throw new Error('Invalid platform');
	const { env } = platform;

	const target = await env.ALIASES.get(params.alias);

	if (target === null) {
		return new Response(null, {
			status: status.SEE_OTHER,
			headers: {
				Location: url.origin
			}
		});
	}

	return new Response(null, {
		status: status.MOVED_PERMANENTLY,
		headers: {
			Location: target
		}
	});
}) satisfies RequestHandler;

export const HEAD = (async ({ params, platform }) => {
	if (!platform) throw new Error('Invalid platform');
	const { env } = platform;

	const target = await env.ALIASES.get(params.alias);
	if (target === null) {
		return new Response(null, { status: status.NOT_FOUND });
	}

	return new Response(null, {
		status: status.OK,
		headers: {
			'X-Location': target
		}
	});
}) satisfies RequestHandler;

export const POST = (async ({ url, params, platform, request }) => {
	if (!platform) throw new Error('Invalid platform');
	const { env } = platform;

	if (!isAuthorized({ request, platform })) {
		return new Response(null, {
			status: status.UNAUTHORIZED
		});
	}

	const target = await request.text();
	await env.ALIASES.put(params.alias, target);

	return new Response(null, {
		status: status.CREATED,
		headers: {
			Location: `${url.origin}/${params.alias}`
		}
	});
}) satisfies RequestHandler;

export const DELETE = (async ({ params, platform, request }) => {
	if (!platform) throw new Error('Invalid platform');
	const { env } = platform;

	if (!isAuthorized({ request, platform })) {
		return new Response(null, {
			status: status.UNAUTHORIZED
		});
	}

	await env.ALIASES.delete(params.alias);
	return new Response(null, { status: status.NO_CONTENT });
}) satisfies RequestHandler;
