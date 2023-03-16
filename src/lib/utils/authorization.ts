import type { RequestEvent } from '../../routes/[alias]/$types';

export const isAuthorized = ({ platform, request }: Pick<RequestEvent, 'platform' | 'request'>) => {
	if (!platform) throw new Error('Invalid platform');

	if (!platform.env.ADMIN_TOKEN) {
		throw new Error('No admin token set');
	}

	const token = request.headers.get('Authorization')?.split(' ')[1];
	return token === platform.env.ADMIN_TOKEN;
};
