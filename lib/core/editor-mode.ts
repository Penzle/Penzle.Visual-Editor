import { getAttribute, getNodeValue, sendMessageToEditor, setAttribute } from '../utilities';
import {
	BUTTON_APPLY_ID,
	BUTTON_CANCEL_ID,
	EntryUpdateMessage,
	Events,
	TOOLTIP_IDENTIFY,
	TOOLTIP_OVERLAY_ID,
	TOOLTIP_TEXT_IDENTIFY,
	TOOLTIP_TITLE_IDENTIFY,
	TagAttributes
} from '../models';
import { TooltipElement } from '../models/tooltip-element.model';

export class EditorMode {
	activeField: HTMLElement | undefined;

	selectedField: HTMLElement | undefined;

	tooltip: TooltipElement;

	constructor() {
		this.tooltip = new TooltipElement();
		this.createTooltip();
	}

	private createTooltip(): void {
		const overlay = this.createTooltipOverlay();
		document.body.appendChild(overlay);
		this.bindEvents();
	}

	private createTooltipOverlay(): HTMLElement {
		const overlay = document.createElement('div');
		overlay.className = TOOLTIP_IDENTIFY;
		overlay.id = TOOLTIP_IDENTIFY;
		overlay.innerHTML = this.getTooltipHtml();
		return overlay;
	}

	private getTooltipHtml(): string {
		const html = `
        <div id="${TOOLTIP_OVERLAY_ID}"></div>
        <div class="penzle-wrapper">
          <div class="penzle-head"> 
            <div class="${TOOLTIP_TITLE_IDENTIFY}"><span class="${TOOLTIP_TEXT_IDENTIFY}"></span>
              <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#ffff"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            </div>
            <div class="penzle-button-wrapper">
              <button type="button" id="${BUTTON_CANCEL_ID}">Cancel</button>
              <button type="button" id="${BUTTON_APPLY_ID}">Apply</button>
            </div>
          </div>
        </div>
      `;
		return html;
	}

	bindEvents(): void {
		const cancel: HTMLElement | null = document.getElementById(BUTTON_CANCEL_ID);
		const save: HTMLElement | null = document.getElementById(BUTTON_APPLY_ID);
		const edit: HTMLElement | null = document.querySelector(`#${TOOLTIP_IDENTIFY} .${TOOLTIP_TITLE_IDENTIFY} svg`);
		const overlay: HTMLElement | null = document.getElementById(TOOLTIP_OVERLAY_ID);

		this.attachEvent(save, 'click', () => this.saveContent());
		this.attachEvent(cancel, 'click', () => this.leaveContentEditMode());
		this.attachEvent(edit, 'click', () => this.enterContentEditMode());
		this.attachEvent(overlay, 'click', () => this.enterContentEditMode());
		this.attachEvent(this.tooltip.getElement(), 'mouseleave', () => this.hideOverlay());

		const elements: NodeListOf<HTMLElement> = document.querySelectorAll(`[${TagAttributes.FIELD_NAME}]`);
		elements.forEach((element) =>
			element.addEventListener('mouseenter', (event) => this.showTooltipOnHover(element, event), false)
		);
	}

	private attachEvent(element: HTMLElement | null, event: string, handler: (event: Event) => void): void {
		element?.addEventListener(event, handler);
	}

	private leaveContentEditMode(): void {
		this.tooltip.removeEditMode();
		this.toggleInPageEditing(false);
		this.deselectField();
	}

	private enterContentEditMode(): void {
		if (this.activeField) {
			this.selectedField = this.activeField;
			this.handleFieldType();
		}
	}

	private handleFieldType(): void {
		if (this.activeField == null) return;

		if (this.activeField.tagName === 'IMG') {
			// $penzle.mediaModule.showMediaPicker();
		} else {
			this.tooltip.setEditMode();
			this.toggleInPageEditing(true);
		}
	}

	saveContent(): void {
		sendMessageToEditor({
			event: Events.EntryUpdate,
			field: getAttribute(this.selectedField, TagAttributes.FIELD_NAME),
			entryId: getAttribute(this.selectedField, TagAttributes.ENTRY_ID),
			language: getAttribute(this.selectedField, TagAttributes.LANGUAGE),
			value: getNodeValue(this.selectedField)
		} as EntryUpdateMessage);

		this.tooltip.removeEditMode();
		this.toggleInPageEditing(false);
		this.deselectField();
	}

	private toggleInPageEditing(value: boolean): void {
		setAttribute(this.selectedField, 'contenteditable', value);
	}

	private hideOverlay(): void {
		if (this.tooltip.hideTooltip()) {
			this.activeField = undefined;
		}
	}

	private showTooltipOnHover(element: HTMLElement, event: MouseEvent): void {
		if (this.tooltip.isEditMode || element.nodeName === 'BODY' || typeof element?.getAttribute !== 'function') {
			return;
		}

		this.activeField = element;
		this.updateTooltipPosition(event);
		this.updateTooltipFieldName(element);
	}

	private updateTooltipFieldName(element: HTMLElement): void {
		const fieldName: string | null = element.getAttribute(TagAttributes.FIELD_NAME);
		const overlayText = document.querySelector(`#${TOOLTIP_IDENTIFY} .${TOOLTIP_TEXT_IDENTIFY}`) as HTMLElement;
		overlayText.innerText = fieldName ?? '';
	}

	private updateTooltipPosition(event: MouseEvent): void {
		const targetElement = (event.target as HTMLElement)?.getBoundingClientRect();
		const left: number = window.scrollX + targetElement.left;
		const top: number = window.scrollY + targetElement.top;
		const { width, height }: { width?: number; height?: number } = targetElement || {};

		this.setDimensions(width, height, top, left);
	}

	private setDimensions(width: number, height: number, top: number, left: number): void {
		const overlay = document.getElementById(TOOLTIP_IDENTIFY);
		if (overlay === null) return;

		overlay.style.setProperty('width', `${width}px`);
		overlay.style.setProperty('height', `${height}px`);
		overlay.style.setProperty('top', `${top}px`);
		overlay.style.setProperty('left', `${left}px`);
		overlay.style.setProperty('visibility', 'visible');
	}

	// updateMedia(mediaItem: { url: string }): void {
	// 	this.selectedField!.setAttribute('src', mediaItem.url);
	// 	this.deselectField();
	// }

	private deselectField(): void {
		this.selectedField = undefined;
	}
}
