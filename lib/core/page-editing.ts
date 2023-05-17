import { sendMessageToEditor } from '../utilities';
import { Message } from '../models';

export class PageEditing {
	receivedOutgoingMessage(message: Message): void {
		sendMessageToEditor(message);
	}
}
