import { Menu } from './core/menu';
import { components } from './modules/components.module';

export class ContextMenu extends Menu {
	constructor(selector) {
		super(selector);
		this.$rootElem = document.querySelector('selector');

		this.$rootElem.addEventListener('click', (e) => {
			const { type } = e.target.dataset;
			components[type].trigger();
		});

		this.modules = components;

		Object.values(this.modules).forEach((module) => {
			this.#add(module);
		});
	}

	#add(module) {
		this.$rootElem.insertAdjacentHTML('beforeend', module.toHTML());
	}

	open(coordX, coordY) {
		this.$rootElem.classList.add('open');
		const { style } = this.$rootElem;
		style.top = `${coordY}px`;
		style.left = `${coordX}px`;
	}

	close() {
		this.$rootElem.classList.remove('open');
	}
}
