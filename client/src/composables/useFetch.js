export const useFetch = async (url, data, method = 'POST') => {
	const res = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	return await res.json()
}
