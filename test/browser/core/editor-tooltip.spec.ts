import { EditorTooltip } from '../../../lib/core/editor-tooltip';

describe('EditorTooltip', () => {
	let editorTooltip: EditorTooltip;
	let mockCallback: jasmine.Spy;

	beforeEach(() => {
		mockCallback = jasmine.createSpy('callback');
		editorTooltip = new EditorTooltip();
	});

	it('should create instance', () => {
		expect(editorTooltip).toBeTruthy();
	});

	it('should bind onSave callback', () => {
		editorTooltip.bindOnSave(mockCallback);
		expect(editorTooltip['onSaveCallback']).toEqual(mockCallback);
	});

	it('should bind onEdit callback', () => {
		editorTooltip.bindOnEdit(mockCallback);
		expect(editorTooltip['onEditCallback']).toEqual(mockCallback);
	});

	it('should set page editing mode', () => {
		editorTooltip.setPageEditingMode(true);
		expect(editorTooltip['isPageEditingMode']).toBeTrue();
		editorTooltip.setPageEditingMode(false);
		expect(editorTooltip['isPageEditingMode']).toBeFalse();
	});

	it('should trigger onSaveCallback when saveContent method is called', () => {
		const element = document.createElement('div');
		element.setAttribute('fieldname', 'Test Field');
		element.setAttribute('entryId', '123');
		element.setAttribute('language', 'English');
		editorTooltip.bindOnSave(mockCallback);
		editorTooltip['selectedField'] = element;
		editorTooltip['saveContent']();
		expect(mockCallback).toHaveBeenCalled();
	});
});
