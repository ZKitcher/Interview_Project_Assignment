const UseFetchGeocoding = (url: string) => {
	return new Promise<LonLatToPostal>(resolve => {
		setTimeout(() => {
			fetch(url)
				.then(res => {
					if (!res.ok) {
						throw new Error(res.statusText)
					}
					return res.json();
				})
				.then(data => {
					resolve(data);
				})
		}, 1000);
	})
}

export default UseFetchGeocoding;