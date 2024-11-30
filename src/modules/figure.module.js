import { Module } from '../core/module'
import { random, getRandomColor } from '../utils'



export class FigureModule extends Module {
    #$rootElement
    #clipPaths
    #timeoutId

    constructor(type, text) {
        super(type, text)
        this.#$rootElement = document.createElement('div')
        this.#$rootElement.classList.add('figure')
        this.#clipPaths = [
            'polygon(50% 0%, 0% 100%, 100% 100%)',
            'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
            'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
            'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
            'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            'polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)',
            'circle(50% at 50% 50%)',
            'ellipse(25% 40% at 50% 50%)',
            'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
        ]
        this.#timeoutId = '';

    }

    trigger() {
        if (this.#timeoutId !== '') {
            this.#timeoutId = '';
        }

        this.#$rootElement.style.clipPath = this.#clipPaths[random(0, this.#clipPaths.length - 1)];
        this.#$rootElement.style.backgroundColor = getRandomColor();

        const figureWidthAndHeight = random(20, 500);
        this.#$rootElement.style.width = `${figureWidthAndHeight}px`;
        this.#$rootElement.style.height = `${figureWidthAndHeight}px`;

        this.#$rootElement.style.top = `${random(0, 100)}%`
        this.#$rootElement.style.left = `${random(0, 100)}%`

        this.#showElement(this.#$rootElement);

        this.#timeoutId = setTimeout(() => {
            this.#removeElement(this.#$rootElement)
        }, 3000);

    }
    #showElement(el) {
        el.style.opacity = 0;
        document.body.appendChild(this.#$rootElement);

        const showTimeout = setTimeout(() => {
            el.style.opacity = 1;
            clearTimeout(showTimeout);
        }, 200);

    };

    #removeElement(el) {
        el.style.opacity = 0;
        const removeTimeout = setTimeout(() => {
            this.#$rootElement.remove();
            clearTimeout(removeTimeout);
        }, 200);
    };
}
