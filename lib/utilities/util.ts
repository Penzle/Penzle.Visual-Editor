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

// if (!Element.prototype.matches) {
// 	Element.prototype.matches =
// 		(Element.prototype as any)['msMatchesSelector'] || (Element.prototype as any)['webkitMatchesSelector'];
// }

// if (!Element.prototype.matches) {
// 	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
// }

// if (!Element.prototype.closest) {
// 	Element.prototype.closest = function (s: string) {
// 		var el: Element | null = this;

// 		do {
// 			if (Element.prototype.matches.call(el, s)) return el;
// 			el = el.parentElement || (el.parentNode as Element);
// 		} while (el !== null && el.nodeType === 1);
// 		return null;
// 	};
// }

// let isPreview: boolean; // This variable needs to be initialized or assigned before being used

// class ProjectSettings {
// 	static setupProjectSettings(): void {
// 		// $penzle.config.lang = $penzle.UTIL.getUrlParameter('lang');
// 		// Assuming $penzle.config.lang is a string. The $penzle object is not defined in your provided code
// 	}
// }

// export { UTIL, isPreview, ProjectSettings };
