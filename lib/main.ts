import { AuthService } from './services/auth.service';
import { PenzleOverlay } from './services/overley.service';
import { XpEditorService } from './services/xp-editor.service';
import { Util } from './utilities/util';

Util.documentReady(() => {
	alert('');
	// if (XpEditorService.isPreview()) {
	XpEditorService.setupProjectSettings();
	const model = new PenzleOverlay();
	console.log(model.selectedField);
	// Assuming that AuthService and LoginModule are classes with static isLoggedIn and init methods respectively
	// and overlayModel and overlay are objects with new and init methods
	if (AuthService.isLoggedIn()) {
		// let model = new OverlayModel();
		// Overlay.init();
	} else {
		// LoginModule.init();
	}
	// }
});
