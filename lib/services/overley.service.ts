import { OverlayModel } from '../models';

export class PenzleOverlay {
	activeField?: HTMLElement;

	selectedField?: HTMLElement;

	overlayModel: OverlayModel;

	constructor() {
		this.overlayModel = new OverlayModel();
		this.createHtmlOverlay();
		this.bindEvents();
	}

	overlayHtml(): string {
		const html = `
        <div id="pz-overlay"></div>
        <div class="wrapper">
          <div class="inline-wrapper">
            <textarea type="text"></textarea>
          </div> 
          <div class="head"> 
            <div class="title"><span class="text"></span>
              <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#ffff"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            </div>
            <div class="button-wrapper">
              <button id="pz-cancel">Cancel</button>
              <button id="pz-save">Save</button>
            </div>
          </div>
        </div>
      `;
		return html;
	}

	createHtmlOverlay(): void {
		const overlay: HTMLElement = document.createElement('div');
		overlay.className = 'component-overlay';
		overlay.id = 'component-overlay';
		overlay.innerHTML = this.overlayHtml();
		document.body.appendChild(overlay);
	}

	bindEvents(): void {
		// const cancel: HTMLElement | null = document.getElementById('pz-cancel');
		// const save: HTMLElement | null = document.getElementById('pz-save');
		// cancel?.addEventListener('click', $penzle.contentComponent.hideContentEditMode);
		// save?.addEventListener('click', $penzle.contentComponent.saveContent);

		const edit: HTMLElement | null = document.querySelector('#component-overlay .title svg');
		const overlay: HTMLElement | null = document.getElementById('pz-overlay');
		edit?.addEventListener('click', (event: MouseEvent) => {
			event.preventDefault();
			this.showEdit();
		});

		overlay?.addEventListener('click', (event: MouseEvent) => {
			this.showEdit();
		});

		this.overlayModel.getElement()?.addEventListener(
			'mouseleave',
			(event: MouseEvent) => {
				this.hideOverlay();
			},
			false
		);

		const elements: NodeListOf<HTMLElement> = document.querySelectorAll('[data-field]');
		elements.forEach((element: HTMLElement) => {
			element.addEventListener(
				'mouseenter',
				(event: MouseEvent) => {
					this.displayOverlay(element, event);
				},
				false
			);
		});
	}

	showEdit(): void {
		if (this.activeField) {
			this.selectedField = this.activeField;
			if (this.activeField.tagName === 'IMG') {
				// $penzle.mediaModule.showMediaPicker();
			} else {
				// $penzle.contentComponent.showContentPopup(this.selectedField);
			}
		}
	}

	hideOverlay(): void {
		const element = this.overlayModel.getElement();
		if (!element?.classList.contains('edit')) {
			element!.style.visibility = 'hidden';
			this.activeField = undefined;
		}
	}

	displayOverlay(element: HTMLElement, event: MouseEvent): void {
		if (this.overlayModel.getElement()?.classList.contains('edit')) {
			return;
		}

		this.activeField = element;
		const fieldName: string | null = element.getAttribute('data-field');
		// const targetElement = event?.target?.getBoundingClientRect();
		const targetElement = (event.target as HTMLElement)?.getBoundingClientRect();

		const left: number = window.scrollX + targetElement.left;
		const top: number = window.scrollY + targetElement.top;
		const { width, height }: { width?: number; height?: number } = targetElement || {};

		// const width: number = targetElement.width;
		// const height: number = targetElement.height;
		const overlayText = document.querySelector('#component-overlay .text') as HTMLElement;
		overlayText.innerText = fieldName!;

		// document.querySelector('#component-overlay .text').innerText = fieldName!;
		if (element.tagName === 'IMG') {
			this.setImgWidth(width, height, top, left);
		} else {
			this.setTextWidth(width, height, top, left);
		}
	}

	setTextWidth(width: number, height: number, top: number, left: number): void {
		const overlay: HTMLElement | null = document.getElementById('component-overlay');
		overlay!.style.width = `${width + 30}px`;
		overlay!.style.height = `${height + 30}px`;
		overlay!.style.top = `${top - 15}px`;
		overlay!.style.left = `${left}px`;
		overlay!.style.visibility = 'visible';
	}

	setImgWidth(width: number, height: number, top: number, left: number): void {
		const overlay: HTMLElement | null = document.getElementById('component-overlay');
		overlay!.style.width = `${width}px`;
		overlay!.style.height = `${height}px`;
		overlay!.style.top = `${top}px`;
		overlay!.style.left = `${left}px`;
		overlay!.style.visibility = 'visible';
	}

	updateMedia(mediaItem: { url: string }): void {
		this.selectedField!.setAttribute('src', mediaItem.url);
		this.deselectField();
	}

	deselectField(): void {
		this.selectedField = undefined;
	}
}
