import { TOOLTIP_IDENTIFY } from './constants';

export class TooltipElement {
	private editClass = 'edit';

	private element: HTMLElement | null = null;

	isEditMode = false;

	getElement(): HTMLElement | null {
		if (!this.element) {
			this.element = document.getElementById(TOOLTIP_IDENTIFY);
		}
		return this.element;
	}

	setEditMode(): void {
		const element = this.getElement();
		if (element) {
			element.classList.add(this.editClass);
			element.focus();
			this.isEditMode = true;
		}
	}

	removeEditMode(): void {
		const element = this.getElement();
		if (element) {
			element.classList.remove(this.editClass);
			this.isEditMode = false;
		}
	}

	hideTooltip(): boolean {
		const element = this.getElement();
		if (element && !element.classList.contains(this.editClass)) {
			element.style.visibility = 'hidden';
			return true;
		}
		return false;
	}
}
