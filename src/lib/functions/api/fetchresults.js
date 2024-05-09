import { error } from '@sveltejs/kit';
import { createApiUrl } from '$lib/functions/api/createurl.js';

/**
 * @param {URLSearchParams} params
 * @param {typeof fetch} fetcher
 * @returns {Promise<ResultType[]>}
 */
export async function fetchResults(params, fetcher) {
	/** @type {URL} */
	let apiUrl;
	try {
		apiUrl = createApiUrl('search', params);
	} catch (/** @type {any} */ err) {
		// Internal Server Error
		throw error(500, `Failed to create API URL: ${err.message}`);
	}

	/** @type {Response} */
	let response;
	try {
		response = await fetcher(apiUrl, {
			method: 'GET', // POST doesn't cache on CDN
			headers: {
				Accept: 'application/json',
				'Accept-Encoding': 'gzip, deflate, br'
			}
		});
	} catch (/** @type {any} */ err) {
		// Bad Gateway
		throw error(502, `Failed to fetch results: ${err.message}`);
	}

	/** @type {ResultType[] | ErrorResponseType} */
	let jsonResponse;
	try {
		jsonResponse = await response.json();
	} catch (/** @type {any} */ err) {
		// Internal Server Error
		throw error(500, `Failed to parse results: ${err.message}`);
	}

	if ('message' in jsonResponse && 'value' in jsonResponse) {
		// same as backend
		throw error(response.status, `${jsonResponse.message}: ${jsonResponse.value}`);
	}

	/** @type {ResultType[]} */
	const results = jsonResponse;

	return results;
}
