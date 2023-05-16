export function monitorUrlChanges(handleUrlUpdate: (updatedUrl: string) => void, pollInterval = 500): () => void {
	let previousUrl = window.location.href;

	const detectUrlUpdate = () => {
		const currentUrl = window.location.href;
		if (currentUrl !== previousUrl) {
			previousUrl = currentUrl;
			handleUrlUpdate(currentUrl);
		}
	};

	const intervalIdentifier = setInterval(detectUrlUpdate, pollInterval);

	// Returns a function to stop observing when called
	return () => clearInterval(intervalIdentifier);
}
