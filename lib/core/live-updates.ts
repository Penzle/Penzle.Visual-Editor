import { isImageElement, sendMessageToEditor, setNewImageSource, setNodeValue } from '../utilities';
import { Events, IncomingMessage, Message, TagAttributes } from '../models';

export class LiveUpdates {
	receivedIncomingMessage(message: IncomingMessage): void {
		if (message.event === Events.EntryUpdate) {
			const element = this.selectElementByDataField(message.field, message.entryId);
			if (!element) return;

			if (isImageElement(element)) {
				setNewImageSource(element, message.value);
			} else {
				setNodeValue(this.selectElementByDataField(message.field, message.entryId), message.value);
			}
		}
	}

	receivedOutgoingMessage(message: Message): void {
		sendMessageToEditor(message);
	}

	private selectElementByDataField(field: string, entryId: string): Element | null {
		return document.querySelector(
			`[${TagAttributes.FIELD_NAME}="${field}"][${TagAttributes.ENTRY_ID}="${entryId}"]`
		);
	}
}
