import { XpEditorService } from './services/xp-editor.service';
import { Util } from './utilities/util';
import './styles/tooltip.scss';
import { PenzleExperienceEditor } from './core/editor-settings';

Util.documentReady(() => {
	// if (XpEditorService.isPreview()) {
	XpEditorService.setupProjectSettings();
	PenzleExperienceEditor.getInstance();
});
