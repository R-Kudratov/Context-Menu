import { Module } from '../core/module'

export class ClicksModule extends Module {
    #$rootElement
    #$textContainer
    #$timeContainer
    #$startAgainBtn
    #SECONDS_LIMIT
    #clicksCounter

    constructor(type, text) {
        super(type, text)
        this.#$rootElement = document.createElement('div');
        this.#$rootElement.classList.add('timer');

        this.#$textContainer = document.createElement('div');
        this.#$textContainer.classList.add('timer__main-text');

        this.#$timeContainer = document.createElement('div');
        this.#$timeContainer.classList.add('timer__seconds');

        this.#$startAgainBtn = document.createElement('button');
        this.#$startAgainBtn.textContent = 'Начать заново';
        this.#$startAgainBtn.classList.add('timer__btn');
        this.#$startAgainBtn.addEventListener('click', this.#startGame.bind(this))

        this.#SECONDS_LIMIT = 5;
        // this.#$rootElement.textContent = `Осталось времени: ${this.#SECONDS_LIMIT}c`;
        this.#$rootElement.append(this.#$textContainer, this.#$timeContainer);

        this.#clicksCounter = 0;

        document.addEventListener('click', this.#countClicks.bind(this))

    }

    trigger() {
        document.body.append(this.#$rootElement);
        this.#startGame();
    }

    #startGame() {
        if (this.#$rootElement.querySelector('button')) {
            this.#$rootElement.removeChild(this.#$startAgainBtn);
        }
        let seconds = this.#SECONDS_LIMIT;
        this.#$textContainer.textContent = `Начали!`;
        this.#$timeContainer.classList.remove('result');
        this.#$timeContainer.textContent = `${seconds}`;
        this.#clicksCounter = 0;

        const startTimerTimeout = setInterval(() => {
            seconds -= 1;
            this.#$timeContainer.textContent = `${seconds}`;
            if (seconds <= 0) {
                this.#$textContainer.textContent = 'Всего кликов:';
                this.#$timeContainer.textContent = this.#clicksCounter - 1;
                this.#$timeContainer.classList.add('result');
                this.#clicksCounter = 0;
                clearInterval(startTimerTimeout);
                this.#$rootElement.append(this.#$startAgainBtn);

            }
        }, 1000);
    }

    #countClicks() {
        this.#clicksCounter += 1;
    }
}