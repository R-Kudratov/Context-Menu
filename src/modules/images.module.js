import { Module } from '../core/module';
import { random } from '../utils';

export class ImagesModule extends Module {
	#images;

	constructor(type, text) {
		super(type, text);
		this.$rootElem = document.body;
		this.#images = [];
	}

	trigger() {
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
			const { tagName } = e.target;
			if (tagName === 'IMG') {
				e.target.remove();
			}
		});
		this.$imgContainer = $imgContainer;

		const $buttonsContainer = document.createElement('div');
		$buttonsContainer.classList.add('buttons-container');

		const $addButton = document.createElement('button');
		$addButton.textContent = 'Добавить картинку';
		$addButton.classList.add('btn', 'add-btn');
		$addButton.addEventListener('click', this.#addImg.bind(this));

		const $deleteButton = document.createElement('button');
		$deleteButton.textContent = 'Удалить все';
		$deleteButton.classList.add('btn', 'delete-btn');
		$deleteButton.addEventListener('click', () => {
			const images = this.$imgContainer.querySelectorAll('img');
			images.forEach((img) => img.remove());
		});

		const $closeButton = document.createElement('button');
		$closeButton.textContent = 'Закрыть';
		$closeButton.classList.add('btn', 'close-btn');
		$closeButton.addEventListener('click', (e) => {
			$container.remove();
		});

		$buttonsContainer.append($addButton, $deleteButton, $closeButton);
		$container.append($buttonsContainer, $imgContainer);
		this.$rootElem.append($container);
	}

	async #addImg() {
		if (this.#images.length === 0) {
			this.#images = await this.#getImageData();
		}
		const randomIndex = random(0, this.#images.length - 1);
		const randomName = this.#images[randomIndex];
		console.log(randomName);
		const url = `https://random.dog/${randomName}`;
		const $img = document.createElement('img');
		$img.classList.add('img');
		$img.alt = 'This is dog';
		$img.src = url;
		$img.title = 'Нажмите для удаления';
		this.$imgContainer.append($img);
	}

	async #getImageData() {
		const url = 'https://random.dog/doggos'; //'https://jsonplaceholder.typicode.com/photos';
		const request = await fetch(url);
		const imgNames = await request.json();
		const jpgImgNames = imgNames.filter((imgName) => imgName.includes('.jpg'));

		return jpgImgNames;
	}
}
