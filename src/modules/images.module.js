import { Module } from '../core/module';
import { random } from '../utils';

export class ImagesModule extends Module {
	#images;

	constructor(type, text) {
		super(type, text);
		this.$rootElem = document.body;
		this.#images = [];
	}

	async trigger() {
		if (this.#images.length === 0) {
			this.#images = await this.#getImageData();
		}
		const container = document.querySelector('.main-img-container');
		if (!container) {
			this.#render();
		}
	}

	async #render() {
		const $container = document.createElement('div');
		$container.classList.add('main-img-container');

		const $imgContainer = document.createElement('div');
		$imgContainer.classList.add('img-container');
		$imgContainer.addEventListener('click', (e) => {
			const { target } = e;
			if (target.className.includes('delete-btn')) {
				const deletedElem = target.closest('.img__wrapper');
				deletedElem.remove();
			}
		});
		this.$imgContainer = $imgContainer;

		const $buttonsContainer = document.createElement('div');
		$buttonsContainer.classList.add('buttons-container');

		const $addButton = document.createElement('button');
		$addButton.textContent = 'Добавить картинку';
		$addButton.classList.add('btn', 'add-btn');
		$addButton.addEventListener('click', this.#addImg.bind(this));

		const $deleteAllButton = document.createElement('button');
		$deleteAllButton.textContent = 'Удалить все';
		$deleteAllButton.classList.add('btn', 'delete-all-btn');
		$deleteAllButton.addEventListener('click', () => {
			const images = this.$imgContainer.querySelectorAll('.img__wrapper');
			images.forEach((img) => img.remove());
		});

		const $closeButton = document.createElement('button');
		$closeButton.textContent = 'Закрыть';
		$closeButton.classList.add('btn', 'close-btn');
		$closeButton.addEventListener('click', () => {
			$container.remove();
		});

		$buttonsContainer.append($addButton, $deleteAllButton, $closeButton);
		$container.append($buttonsContainer, $imgContainer);
		this.$rootElem.append($container);
	}

	async #addImg() {
		const $loader = document.createElement('div');
		$loader.classList.add('img__wrapper', 'loader');

		const randomIndex = random(0, this.#images.length - 1);
		const randomName = this.#images[randomIndex];

		const url = `https://random.dog/${randomName}`;
		const $imageWrapper = document.createElement('div');
		$imageWrapper.classList.add('img__wrapper');

		const $deleteButton = document.createElement('div');
		$deleteButton.classList.add('delete-btn');
		$deleteButton.title = 'Удалить';

		const $img = document.createElement('img');
		$img.classList.add('img');
		$img.alt = 'This is dog';
		$img.src = url;

		$img.addEventListener('load', () => ($loader.style.display = 'none'));

		$imageWrapper.append($loader, $img, $deleteButton);
		this.$imgContainer.append($imageWrapper);
	}

	async #getImageData() {
		const url = 'https://random.dog/doggos'; //'https://jsonplaceholder.typicode.com/photos';
		const request = await fetch(url);
		const imgNames = await request.json();
		const jpgImgNames = imgNames.filter((imgName) => imgName.includes('.jpg'));

		return jpgImgNames;
	}
}
