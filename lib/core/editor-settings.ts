import { Events, TagAttributes, EditorSettings } from '../models';
import { detectIframeEnvironment, monitorUrlChanges, sendMessageToEditor } from '../utilities';
import { EditorTooltip } from './editor-tooltip';
import { LiveUpdates } from './live-updates';
import { PageEditing } from './page-editing';

export class PenzleExperienceEditor {
	private static instance: PenzleExperienceEditor | null = null;

	private initialized = false;

	private pageEditingMode: PageEditing | null = null;

	private liveUpdatesMode: LiveUpdates | null = null;

	private tooltip: EditorTooltip | null = null;

	private pageEditingEnabled = true;

	private pageLiveUpdatesEnabled = true;

	static getInstance(settings?: EditorSettings): PenzleExperienceEditor {
		if (!PenzleExperienceEditor.instance) {
			PenzleExperienceEditor.instance = new PenzleExperienceEditor();
		}

		PenzleExperienceEditor.instance.initialize(settings);

		return PenzleExperienceEditor.instance;
	}

	initialize({ enablePageEditing, enablePageLiveUpdates }: EditorSettings = {}): void {
		if (!this.isBrowserEnvironment()) {
			return;
		}

		if (!this.isIframeEnvironment()) {
			this.pageLiveUpdatesEnabled = true;

			// this.pageLiveUpdatesEnabled = false;
			// return null;
		}

		this.tooltip = new EditorTooltip();
		this.toggleInspectorMode(enablePageEditing);
		this.toggleLiveUpdates(enablePageLiveUpdates);

		if (this.initialized) {
			return;
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
			this.pageEditingMode = new PageEditing();
			this.tooltip?.bindOnEdit(this.pageEditingMode.receivedOutgoingMessage);
		}

		if (this.pageLiveUpdatesEnabled) {
			this.liveUpdatesMode = new LiveUpdates();
			this.tooltip?.bindOnSave(this.liveUpdatesMode.receivedOutgoingMessage);
		}
	}

	private handleMessageEvent(event: MessageEvent) {
		if (typeof event.data !== 'object' || !event.data) return;
		if (event.data.from !== 'xp-editor') return;

		if (this.pageLiveUpdatesEnabled) {
			this.liveUpdatesMode?.receivedIncomingMessage(event.data);
		}
	}
}
