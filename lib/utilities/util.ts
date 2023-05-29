export function getAttribute(dom: Node | string | undefined, attributeName: string): string | null {
	return (dom as HTMLElement)?.getAttribute(attributeName);
}

export function setAttribute(dom: Node | string | undefined, attributeName: string, value: any): void {
	(dom as HTMLElement)?.setAttribute(attributeName, value);
}

export function getNodeValue(dom: Node | undefined): string | null {
	return (dom as HTMLElement)?.innerHTML;
}

export function setNodeValue(dom: Node | null | undefined, value: any): void {
	const element = dom as HTMLElement;
	if (element) {
		element.innerHTML = value;
	}
}

export function canHaveBackgroundImage(element: Element): boolean {
	const style = window.getComputedStyle(element);
	return style.backgroundImage !== 'none';
}

export function isImageElement(element: HTMLElement | Element): boolean {
	const { tagName } = element;
	switch (tagName) {
		case 'IMG':
		case 'OBJECT':
		case 'EMBED':
		case 'CANVAS':
		case 'PICTURE':
			return true;
		default:
			return canHaveBackgroundImage(element);
	}
}

/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
export function setNewImageSource(element: Element, newSource: string): void {
	const { tagName } = element;

	switch (tagName) {
		case 'IMG':
			(element as HTMLImageElement).src = newSource;
			break;
		case 'OBJECT':
		case 'EMBED':
			(element as HTMLEmbedElement).src = newSource;
			break;
		case 'CANVAS':
			const ctx = (element as HTMLCanvasElement).getContext('2d');
			const img = new Image();
			img.onload = () => {
				if (ctx) {
					ctx.clearRect(0, 0, element.clientWidth, element.clientHeight);
					ctx.drawImage(img, 0, 0);
				}
			};
			img.src = newSource;
			break;
		case 'PICTURE':
			const imgTag = element.querySelector('img');
			if (imgTag) {
				(imgTag as HTMLImageElement).src = newSource;
			}
			const sourceTags = element.querySelectorAll('source');
			sourceTags.forEach((sourceTag: HTMLSourceElement) => {
				sourceTag.srcset = newSource;
			});
			break;
		default:
			(element as HTMLElement).style.backgroundImage = `url(${newSource})`;
			break;
	}
}
