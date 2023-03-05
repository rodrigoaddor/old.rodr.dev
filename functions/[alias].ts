type AliasFunction = PagesFunction<Env, 'alias', { alias: string }>;
type AliasContext = Parameters<AliasFunction>[0];

const isAuthorized = ({ env: { ADMIN_TOKEN }, request: { headers } }: AliasContext): boolean => {
	const token = headers.get('Authorization')?.split(' ')[1];
	console.log({ token });
	return token === ADMIN_TOKEN;
};

const handlers: Record<string, (context: AliasContext) => Promise<Response>> = {
	GET: async (context: AliasContext) => {
		const { env, data, request } = context;

		const target = await env.ALIASES.get(data.alias);

		if (target === null) {
			return new Response(null, {
				status: 404,
				headers: {
					Location: new URL(request.url).origin
				}
			});
		}

		return new Response(null, {
			status: 302,
			headers: {
				Location: target
			}
		});
	},

	HEAD: async (context: AliasContext) => {
		const { env, data } = context;

		const target = await env.ALIASES.get(data.alias);
		return new Response(null, {
			status: target === null ? 404 : 302,
			headers: {
				'X-Location': target
			}
		});
	},

	POST: async (context: AliasContext) => {
		const { env, data, request } = context;

		console.log('HELLO??');

		if (!isAuthorized(context)) {
			return new Response(null, {
				status: 401
			});
		}

		const target = await request.text();
		await env.ALIASES.put(data.alias, target);

		return new Response(null, {
			status: 201,
			headers: {
				Location: `${new URL(request.url).origin}/${data.alias}`
			}
		});
	},

	DELETE: async (context: AliasContext) => {
		const { env, data } = context;

		if (!isAuthorized(context)) {
			return new Response(null, {
				status: 401
			});
		}

		await env.ALIASES.delete(data.alias);

		return new Response(null, {
			status: 204
		});
	}
};

export const onRequest: AliasFunction = async (context) => {
	const { data, params, request } = context;
	data.alias = Array.isArray(params.alias) ? params.alias[0] : params.alias;

	console.log('incoming!!!');

	if (request.method in handlers) {
		return handlers[request.method](context);
	}

	return new Response(null, {
		status: 405,
		headers: {
			Allow: Object.keys(handlers).join(', ')
		}
	});
};
