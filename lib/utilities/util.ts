export class Util {
	static documentReady(fn: () => void): void {
		if (document.readyState === 'complete') {
			// see if DOM is already available
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}

	static removeElementsByClass(className: string): void {
		const elements = Array.from(document.getElementsByClassName(className));
		while (elements.length > 0) {
			elements[0].parentNode?.removeChild(elements[0]);
		}
	}

	static getUrlParameter(name: string, url: string = window.location.href): string | null {
		const nameValue = name.replace(/[\[\]]/g, '\\$&');
		const regex = new RegExp('[?&]' + nameValue + '(=([^&#]*)|&|#|$)');
		const results = regex.exec(url);

		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}
}

export function getAttribute(dom: Node | string | undefined, attributeName: string): string | null {
	return (dom as HTMLElement)?.getAttribute(attributeName);
}

export function setAttribute(dom: Node | string | undefined, attributeName: string, value: any): void {
	(dom as HTMLElement)?.setAttribute(attributeName, value);
}

export function getNodeValue(dom: Node | undefined): string | null {
	return (dom as HTMLElement)?.innerHTML;
}
