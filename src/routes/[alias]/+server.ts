import { isAuthorized } from '$lib/utils/authorization';
import type { RequestHandler } from './$types';

export const GET = (async ({ url, params, platform }) => {
	if (!platform) throw new Error('Invalid platform');
	const { env } = platform;

	const target = await env.ALIASES.get(params.alias);

	if (target === null) {
		return new Response(null, {
			status: 404,
			headers: {
				Location: url.origin
			}
		});
	}

	return new Response(null, {
		status: 302,
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
		return new Response(null, { status: 404 });
	}

	return new Response(null, {
		status: 200,
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
			status: 401
		});
	}

  const target = await request.text();
  await env.ALIASES.put(params.alias, target);

	return new Response(null, {
		status: 201,
		headers: {
			'X-Location': `${url.origin}/${params.alias}`
		}
	});
}) satisfies RequestHandler;

export const DELETE = (async ({ params, platform, request }) => {
  if (!platform) throw new Error('Invalid platform');
  const { env } = platform;

  if (!isAuthorized({ request, platform })) {
    return new Response(null, {
      status: 401
    });
  }

  await env.ALIASES.delete(params.alias);
  return new Response(null, { status: 204 });
}) satisfies RequestHandler;