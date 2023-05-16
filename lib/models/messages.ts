export enum Events {
	IframeConnected = 'IFRAME_CONNECTED',
	FieldClicked = 'FIELD_CLICKED',
	UnknownEntity = 'UNKNOWN_ENTITY',
	UrlChanged = 'URL_CHANGED',
	EntryUpdate = 'ENTRY_UPDATE'
}

export interface IframeConnectedMessage {
	event: Events.IframeConnected;
	connected: true;
	fields: number;
}

export interface FieldClickMessage {
	event: Events.FieldClicked;
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
	| EntryUpdateMessage;

export type OutgoingMessage = Message & {
	from: 'xp-editor';
	location: string;
};

export type IncomingMessage = EntryUpdateMessage & {
	from: 'xp-editor';
};
