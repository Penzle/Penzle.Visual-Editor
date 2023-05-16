import { Util } from '../utilities/util';

export class XpEditorService {
	static isPreview(): boolean {
		const preview = Util.getUrlParameter('preview');
		return preview === 'true' || preview === '1';
	}

	static setupProjectSettings(): void {
		// Assuming $penzle.config.lang is a string
		// $penzle.config.lang = UTIL.getUrlParameter('lang');
		// The $penzle object is not defined in your provided code
	}
}
