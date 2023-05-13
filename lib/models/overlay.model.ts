export class OverlayModel {
	private element: HTMLElement | null = null;

	isVisible = false;

	isModeEdit = false;

	save: () => void = () => {};

	getElement(): HTMLElement | null {
		if (!this.element) {
			this.element = document.getElementById('component-overlay');
		}
		return this.element;
	}
}
