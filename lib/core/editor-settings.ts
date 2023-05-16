// import { Events, TagAttributes, EditorSettings } from '../models';
// import { detectIframeEnvironment, monitorUrlChanges, sendMessageToEditor } from '../utilities';
// import { EditorMode } from './editor-mode';
// import { LiveUpdates } from './live-updates';

// export class PenzleExperienceEditor {
// 	static initialized = false;

// 	static editorMode: EditorMode | null = null;

// 	static liveUpdates: LiveUpdates | null = null;

// 	static pageEditingEnabled = true;

// 	static pageLiveUpdatesEnabled = true;

// 	static create({ enablePageEditing, enablePageLiveUpdates }: EditorSettings = {}):
// 		| Promise<EditorMode | null>
// 		| undefined {
// 		// Check if running in a browser environment
// 		if (typeof window !== 'undefined') {
// 			if (!detectIframeEnvironment()) {
// 				// If the SDK is used outside of the LivePreviewIframe it should do nothing
// 				this.pageLiveUpdatesEnabled = false;

// 				return Promise.resolve(null);
// 			}

// 			// toggle inspector mode based on flag
// 			if (typeof enablePageEditing === 'boolean') {
// 				this.pageEditingEnabled = enablePageEditing;
// 			}

// 			// toggle live updates based on flag
// 			if (typeof enablePageLiveUpdates === 'boolean') {
// 				this.pageLiveUpdatesEnabled = enablePageLiveUpdates;
// 			}

// 			if (PenzleExperienceEditor.initialized) {
// 				return Promise.resolve(PenzleExperienceEditor.editorMode);
// 			}

// 			// setup the live preview plugins (inspectorMode and liveUpdates)
// 			if (this.pageEditingEnabled) {
// 				PenzleExperienceEditor.editorMode = new EditorMode();
// 			}

// 			if (this.pageLiveUpdatesEnabled) {
// 				PenzleExperienceEditor.liveUpdates = new LiveUpdates();
// 			}

// 			// bind event listeners for interactivity
// 			window.addEventListener('message', (event) => {
// 				if (typeof event.data !== 'object' || !event.data) return;
// 				if (event.data.from !== 'xp-editor') return;

// 				if (this.pageLiveUpdatesEnabled) {
// 					PenzleExperienceEditor.liveUpdates?.receivedMessage(event.data);
// 				}
// 			});

// 			// navigation changes
// 			monitorUrlChanges(() => {
// 				sendMessageToEditor({ event: Events.UrlChanged });
// 			});

// 			// tell the editor that there's a SDK
// 			sendMessageToEditor({
// 				event: Events.IframeConnected,
// 				connected: true,
// 				fields: document.querySelectorAll(`[${TagAttributes.ENTRY_ID}]`).length
// 			});

// 			// all set up - ready to go
// 			this.initialized = true;
// 			return Promise.resolve(PenzleExperienceEditor.editorMode);
// 		}

// 		return Promise.resolve(null);
// 	}
// }

import { Events, TagAttributes, EditorSettings } from '../models';
import { detectIframeEnvironment, monitorUrlChanges, sendMessageToEditor } from '../utilities';
import { EditorMode } from './editor-mode';
import { LiveUpdates } from './live-updates';

export class PenzleExperienceEditor {
	private static instance: PenzleExperienceEditor | null = null;

	private initialized = false;

	private editorMode: EditorMode | null = null;

	private liveUpdates: LiveUpdates | null = null;

	private pageEditingEnabled = true;

	private pageLiveUpdatesEnabled = true;

	static getInstance(settings?: EditorSettings): PenzleExperienceEditor {
		if (!PenzleExperienceEditor.instance) {
			PenzleExperienceEditor.instance = new PenzleExperienceEditor();
		}

		PenzleExperienceEditor.instance.initialize(settings);

		return PenzleExperienceEditor.instance;
	}

	initialize({ enablePageEditing, enablePageLiveUpdates }: EditorSettings = {}): EditorMode | null {
		if (!this.isBrowserEnvironment()) {
			return null;
		}

		if (!this.isIframeEnvironment()) {
			this.pageLiveUpdatesEnabled = true;

			// this.pageLiveUpdatesEnabled = false;
			// return null;
		}

		this.toggleInspectorMode(enablePageEditing);
		this.toggleLiveUpdates(enablePageLiveUpdates);

		if (this.initialized) {
			return this.editorMode;
		}

		this.setupLivePreviewPlugins();

		window.addEventListener('message', this.handleMessageEvent);

		monitorUrlChanges(() => {
			sendMessageToEditor({ event: Events.UrlChanged });
		});

		sendMessageToEditor({
			event: Events.IframeConnected,
			connected: true,
			fields: document.querySelectorAll(`[${TagAttributes.ENTRY_ID}]`).length
		});

		this.initialized = true;
		return this.editorMode;
	}

	private isBrowserEnvironment(): boolean {
		return typeof window !== 'undefined';
	}

	private isIframeEnvironment(): boolean {
		return detectIframeEnvironment();
	}

	private toggleInspectorMode(enablePageEditing?: boolean) {
		if (typeof enablePageEditing === 'boolean') {
			this.pageEditingEnabled = enablePageEditing;
		}
	}

	private toggleLiveUpdates(enablePageLiveUpdates?: boolean) {
		if (typeof enablePageLiveUpdates === 'boolean') {
			this.pageLiveUpdatesEnabled = enablePageLiveUpdates;
		}
	}

	private setupLivePreviewPlugins() {
		if (this.pageEditingEnabled) {
			this.editorMode = new EditorMode();
		}

		if (this.pageLiveUpdatesEnabled) {
			this.liveUpdates = new LiveUpdates();
		}
	}

	private handleMessageEvent(event: MessageEvent) {
		if (typeof event.data !== 'object' || !event.data) return;
		if (event.data.from !== 'xp-editor') return;

		if (this.pageLiveUpdatesEnabled) {
			this.liveUpdates?.receivedMessage(event.data);
		}
	}
}
