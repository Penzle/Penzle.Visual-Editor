import { sendMessageToEditor, detectIframeEnvironment } from '../../../lib/utilities/message-communication';
import { Message, Events, EditorSource, FieldTypes } from '../../../lib/models/messages';

describe('Utility functions', () => {
	let testMessage: Message;
	let postMessageSpy: jasmine.Spy;

	beforeEach(() => {
		testMessage = {
			event: Events.FieldClicked,
			field: 'testField',
			fieldType: FieldTypes.Default,
			entryId: 'testId'
		};
		postMessageSpy = spyOn(window.top, 'postMessage');
	});

	it('sendMessageToEditor works correctly', () => {
		sendMessageToEditor(testMessage);

		const expectedMessage = {
			...testMessage,
			from: EditorSource.VisualEditor,
			location: window.location.href
		};

		expect(postMessageSpy).toHaveBeenCalledWith(expectedMessage, '*');
	});

	it('detectIframeEnvironment returns false when window is not inside an iframe', () => {
		expect(detectIframeEnvironment()).toBe(true);
	});
});
