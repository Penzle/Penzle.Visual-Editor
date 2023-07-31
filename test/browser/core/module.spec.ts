import { TOOLTIP_IDENTIFY } from '../../../lib/models/constants';
import { TooltipElement } from '../../../lib/models/tooltip-element.model';

describe('TooltipElement', () => {
	let tooltipElement: TooltipElement;
	let fakeElement: HTMLElement;
	beforeEach(() => {
		tooltipElement = new TooltipElement();
		fakeElement = document.createElement('div');
		fakeElement.id = TOOLTIP_IDENTIFY;
		document.body.appendChild(fakeElement);
	});

	afterEach(() => {
		document.body.removeChild(fakeElement);
	});

	it('should remove edit mode correctly', () => {
		tooltipElement.setEditMode();
		tooltipElement.removeEditMode();
		expect(fakeElement.classList.contains('edit')).toBeFalse();
		expect(tooltipElement.isEditMode).toBeFalse();
	});

	it('should not hide tooltip if in edit mode', () => {
		tooltipElement.setEditMode();
		const result = tooltipElement.hideTooltip();
		expect(fakeElement.style.visibility).not.toBe('hidden');
		expect(result).toBeFalse();
	});
});
