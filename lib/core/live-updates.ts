import { sendMessageToEditor, setNodeValue } from '../utilities';
import { Events, IncomingMessage, Message, TagAttributes } from '../models';

export class LiveUpdates {
	receivedIncomingMessage(message: IncomingMessage): void {
		if (message.event === Events.EntryUpdate) {
			setNodeValue(this.selectElementByDataField(message.field), message.value);
		}
	}

	receivedOutgoingMessage(message: Message): void {
		sendMessageToEditor(message);
	}

	private selectElementByDataField(field: string): Element | null {
		return document.querySelector(`[${TagAttributes.FIELD_NAME}="${field}"]`);
	}
}
