import { EditorSource, Message, OutgoingMessage } from '../models';

export function sendMessageToEditor(message: Message): void {
	const outgoingMessage: OutgoingMessage = {
		...message,
		from: EditorSource.VisualEditor,
		location: window.location.href
	};

	window.top?.postMessage(outgoingMessage, '*');
}

export function detectIframeEnvironment() {
	try {
		// If window.self and window.top are the same, then the current window is not inside an iframe
		return window.self !== window.top;
	} catch (err) {
		// window.top is not accessible for iframes with different origins, so we assume it's inside an iframe
		return true;
	}
}
