import { LiveUpdates } from '../../../lib/core/live-updates';
import { EditorSource, Events, IncomingMessage, OutgoingMessage, TagAttributes } from '../../../lib/models/index';

describe('LiveUpdates', () => {
	let liveUpdates: LiveUpdates;

	beforeEach(() => {
		liveUpdates = new LiveUpdates();
	});

	it('should handle an incoming message with the event EntryUpdate', () => {
		const message: IncomingMessage = {
			event: Events.EntryUpdate,
			field: 'field',
			entryId: '1',
			value: 'new value'
		};

		// Create a mock element to match the incoming message.
		const element = document.createElement('div');
		element.setAttribute(TagAttributes.FIELD_NAME, message.field);
		element.setAttribute(TagAttributes.ENTRY_ID, message.entryId);
		document.body.appendChild(element);

		// Spy on document.querySelector to return the mock element.
		spyOn(document, 'querySelector').and.returnValue(element);

		liveUpdates.receivedIncomingMessage(message);
		expect(element.textContent).toEqual(message.value);
		document.body.removeChild(element);
	});
});
