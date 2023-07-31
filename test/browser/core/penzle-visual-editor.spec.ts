import { PenzleVisualEditor } from '../../../lib/core/penzle-visual-editor';
import { EditorSource, Events, IncomingMessage } from '../../../lib/models/messages';

describe('PenzleVisualEditor', () => {
	let editor: PenzleVisualEditor;

	beforeEach(() => {
		editor = PenzleVisualEditor.create();
	});

	it('create should return an instance of PenzleVisualEditor', () => {
		expect(editor instanceof PenzleVisualEditor).toBeTrue();
	});

	it('initialize should call the required methods', () => {
		const settings = {
			enablePageEditing: true,
			enablePageLiveUpdates: true
		};
		editor.initialize(settings);
		expect(editor.pageEditingEnabled).toBeTrue();
		expect(editor.pageLiveUpdatesEnabled).toBeTrue();
	});

	it('toggleInspectorMode should update the pageEditingEnabled property', () => {
		editor.toggleInspectorMode(true);
		expect(editor.pageEditingEnabled).toBeTrue();
		editor.toggleInspectorMode(false);
		expect(editor.pageEditingEnabled).toBeFalse();
	});

	it('toggleLiveUpdates should update the pageLiveUpdatesEnabled property', () => {
		editor.toggleLiveUpdates(true);
		expect(editor.pageLiveUpdatesEnabled).toBeTrue();
		editor.toggleLiveUpdates(false);
		expect(editor.pageLiveUpdatesEnabled).toBeFalse();
	});

	it('should handle incoming messages correctly', () => {
		const eventData: IncomingMessage = {
			from: EditorSource.VisualEditor,
			event: Events.ExitPageEditingMode
		};
		const fakeEvent = new MessageEvent('message', { data: eventData });

		// Create spy on liveUpdatesMode.receivedIncomingMessage
		spyOn(editor.liveUpdatesMode!, 'receivedIncomingMessage');

		// Execute
		editor.handleMessageEvent(fakeEvent);

		// Assert
		expect(editor.liveUpdatesMode?.receivedIncomingMessage).toHaveBeenCalledWith(eventData);
	});
});
