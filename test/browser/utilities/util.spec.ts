import {
	getAttribute,
	setAttribute,
	getNodeValue,
	setNodeValue,
	canHaveBackgroundImage,
	isImageElement,
	setNewImageSource
} from '../../../lib/utilities/util';

describe('DOM utility functions', () => {
	let testElement: HTMLElement;

	beforeEach(() => {
		testElement = document.createElement('div');
		document.body.appendChild(testElement);
	});

	afterEach(() => {
		document.body.removeChild(testElement);
	});

	it('getAttribute and setAttribute work correctly', () => {
		setAttribute(testElement, 'data-test', 'testValue');
		expect(getAttribute(testElement, 'data-test')).toBe('testValue');
	});

	it('getNodeValue and setNodeValue work correctly', () => {
		setNodeValue(testElement, 'testValue');
		expect(getNodeValue(testElement)).toBe('testValue');
	});

	it('canHaveBackgroundImage works correctly', () => {
		testElement.style.backgroundImage = 'url("test.jpg")';
		expect(canHaveBackgroundImage(testElement)).toBeTrue();
	});

	it('isImageElement works correctly', () => {
		const imgElement = document.createElement('img');
		document.body.appendChild(imgElement);
		expect(isImageElement(imgElement)).toBeTrue();
		document.body.removeChild(imgElement);
	});

	it('setNewImageSource works correctly for IMG elements', () => {
		const imgElement = document.createElement('img');
		document.body.appendChild(imgElement);
		setNewImageSource(imgElement, 'test.jpg');
		expect(imgElement.src).toContain('test.jpg');
		document.body.removeChild(imgElement);
	});

	it('setNewImageSource works correctly for OBJECT and EMBED elements', () => {
		const objectElement = document.createElement('object');
		const embedElement = document.createElement('embed');

		document.body.appendChild(objectElement);
		document.body.appendChild(embedElement);

		setNewImageSource(objectElement, 'test.swf');
		setNewImageSource(embedElement, 'test.swf');

		expect(embedElement.src).toContain('test.swf');

		document.body.removeChild(objectElement);
		document.body.removeChild(embedElement);
	});

	it('setNewImageSource works correctly for PICTURE elements', () => {
		const pictureElement = document.createElement('picture');
		const imgTag = document.createElement('img');
		const sourceTag = document.createElement('source');

		pictureElement.appendChild(imgTag);
		pictureElement.appendChild(sourceTag);
		document.body.appendChild(pictureElement);

		setNewImageSource(pictureElement, 'test.jpg');

		expect(imgTag.src).toContain('test.jpg');
		expect(sourceTag.srcset).toContain('test.jpg');

		document.body.removeChild(pictureElement);
	});

	it('setNewImageSource works correctly for other elements', () => {
		const divElement = document.createElement('div');
		document.body.appendChild(divElement);

		setNewImageSource(divElement, 'test.jpg');

		expect(divElement.style.backgroundImage).toBe('url("test.jpg")');

		document.body.removeChild(divElement);
	});
});
