import { sendMessageToEditor } from '../utilities';
import { EDITOR_MODE_ACTIVE, Message, SwitchToPageEditingModeMessage } from '../models';

export class PageEditing {
	receivedOutgoingMessage(message: Message): void {
		sendMessageToEditor(message);
	}

	setPageEditingEnabled(editingMode: SwitchToPageEditingModeMessage): boolean {
		document.body.classList.toggle(EDITOR_MODE_ACTIVE, editingMode.value);
		return editingMode.value;
	}
}
