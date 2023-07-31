import { monitorUrlChanges } from '../../../lib/utilities/monitor-url-changes';

describe('monitorUrlChanges', () => {
	let originalHref: string;
	let intervalSpy: jasmine.Spy;
	let clearIntervalSpy: jasmine.Spy;

	beforeEach(() => {
		originalHref = window.location.href;
		intervalSpy = spyOn(window, 'setInterval');
		clearIntervalSpy = spyOn(window, 'clearInterval');
	});

	afterEach(() => {
		window.history.replaceState(null, '', originalHref);
	});

	it('should call handleUrlUpdate callback when url changes', (done) => {
		const handleUrlUpdateSpy = jasmine.createSpy('handleUrlUpdate');
		const stopObserving = monitorUrlChanges(handleUrlUpdateSpy, 100);

		intervalSpy.calls.mostRecent().args[0](); // Invoke the callback passed to setInterval

		expect(handleUrlUpdateSpy).not.toHaveBeenCalled();

		window.history.replaceState(null, '', '/new-url'); // Simulate a URL change

		setTimeout(() => {
			intervalSpy.calls.mostRecent().args[0](); // Invoke the callback passed to setInterval

			expect(handleUrlUpdateSpy).toHaveBeenCalledWith(window.location.href);
			stopObserving(); // Stop observing URL changes

			expect(clearIntervalSpy).toHaveBeenCalled();

			done();
		}, 200);
	});
});
