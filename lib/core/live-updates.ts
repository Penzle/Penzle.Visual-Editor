import { Events, IncomingMessage, TagAttributes } from '../models';

export class LiveUpdates {
	receivedMessage(message: IncomingMessage): void {
		if (message.event === Events.EntryUpdate) {
			const element = this.selectElementByDataField(message.field);
			if (element) {
				element.innerHTML = message.value;
			}
		}
	}

	private selectElementByDataField(field: string): Element | null {
		return document.querySelector(`[${TagAttributes.FIELD_NAME}="${field}"]`);
	}
}
