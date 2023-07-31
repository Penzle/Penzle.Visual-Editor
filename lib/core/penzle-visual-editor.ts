import { Events, TagAttributes, EditorSettings, EditorSource } from '../models';
import { detectIframeEnvironment, monitorUrlChanges, sendMessageToEditor } from '../utilities';
import { EditorTooltip } from './editor-tooltip';
import { LiveUpdates } from './live-updates';
import { PageEditing } from './page-editing';
import '../styles/tooltip.scss';

export class PenzleVisualEditor {
	static instance: PenzleVisualEditor | null = null;

	private initialized = false;

	pageEditingMode: PageEditing | null = null;

	liveUpdatesMode: LiveUpdates | null = null;

	tooltip: EditorTooltip | null = null;

	pageEditingEnabled = true;

	pageLiveUpdatesEnabled = true;

	static create(settings?: EditorSettings): PenzleVisualEditor {
		if (!PenzleVisualEditor.instance) {
			PenzleVisualEditor.instance = new PenzleVisualEditor();
		}

		PenzleVisualEditor.instance.initialize(settings);

		return PenzleVisualEditor.instance;
	}

	initialize({ enablePageEditing, enablePageLiveUpdates }: EditorSettings = {}): void {
		if (!this.isBrowserEnvironment()) {
			return;
		}

		if (!this.isIframeEnvironment()) {
			this.pageLiveUpdatesEnabled = false;
			return;
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

	toggleInspectorMode(enablePageEditing?: boolean) {
		if (typeof enablePageEditing === 'boolean') {
			this.pageEditingEnabled = enablePageEditing;
		}
	}

	toggleLiveUpdates(enablePageLiveUpdates?: boolean) {
		if (typeof enablePageLiveUpdates === 'boolean') {
			this.pageLiveUpdatesEnabled = enablePageLiveUpdates;
		}
	}

	handleMessageEvent(event: MessageEvent) {
		if (typeof event.data !== 'object' || !event.data || !PenzleVisualEditor.instance) return;
		if (event.data.from !== EditorSource.VisualEditor) return;

		const { instance } = PenzleVisualEditor;
		if (event.data.event === Events.SwitchToPageEditingMode && instance.tooltip && instance.pageEditingMode) {
			instance.tooltip.setPageEditingMode(instance.pageEditingMode.setPageEditingEnabled(event.data));
		}

		if (instance.pageLiveUpdatesEnabled) {
			instance.liveUpdatesMode?.receivedIncomingMessage(event.data);
		}
	}

	private isBrowserEnvironment(): boolean {
		return typeof window !== 'undefined';
	}

	private isIframeEnvironment(): boolean {
		return detectIframeEnvironment();
	}

	private setupLivePreviewPlugins() {
		if (this.pageEditingEnabled) {
			this.pageEditingMode = new PageEditing();
			this.tooltip?.bindOnEdit(this.pageEditingMode.receivedOutgoingMessage);
		}

		if (this.pageLiveUpdatesEnabled) {
			this.liveUpdatesMode = new LiveUpdates();
			this.tooltip?.bindOnEdit(this.liveUpdatesMode.receivedOutgoingMessage);
			this.tooltip?.bindOnSave(this.liveUpdatesMode.receivedOutgoingMessage);
		}
	}
}
