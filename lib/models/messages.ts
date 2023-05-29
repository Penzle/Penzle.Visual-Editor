export enum EditorSource {
	VisualEditor = 'visual-editor'
}

export enum Events {
	IframeConnected = 'IFRAME_CONNECTED',
	FieldClicked = 'FIELD_CLICKED',
	UnknownEntity = 'UNKNOWN_ENTITY',
	UrlChanged = 'URL_CHANGED',
	EntryUpdate = 'ENTRY_UPDATE',
	SwitchToPageEditingMode = 'SWITCH_TO_PAGE_EDITING',
	ExitPageEditingMode = 'EXIT_PAGE_EDITING'
}

export enum FieldTypes {
	Default = 'DEFAULT',
	Media = 'MEDIA'
}

export interface IframeConnectedMessage {
	event: Events.IframeConnected;
	connected: true;
	fields: number;
}

export interface ExitEditingModeMessage {
	event: Events.ExitPageEditingMode;
}

export interface FieldClickMessage {
	event: Events.FieldClicked;
	fieldType: FieldTypes.Default;
	field: string;
	entryId: string;
	language?: string;
}

export interface UnknownEntityMessage {
	event: Events.UnknownEntity;
	entryId: string;
	dataTemplate?: string;
}

export interface UrlChangedMessage {
	event: Events.UrlChanged;
}

export interface SwitchToPageEditingModeMessage {
	event: Events.SwitchToPageEditingMode;
	value: boolean;
}

export interface EntryUpdateMessage {
	event: Events.EntryUpdate;
	field: string;
	value: string;
	entryId: string;
	language?: string;
}

export type Message =
	| IframeConnectedMessage
	| FieldClickMessage
	| UnknownEntityMessage
	| UrlChangedMessage
	| EntryUpdateMessage
	| SwitchToPageEditingModeMessage;

export type OutgoingMessage = Message & {
	from: EditorSource.VisualEditor;
	location: string;
};

export type IncomingMessage =
	| EntryUpdateMessage
	| (ExitEditingModeMessage & {
			from: EditorSource.VisualEditor;
	  });
