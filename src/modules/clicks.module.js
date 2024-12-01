import { Module } from '../core/module'

export class ClicksModule extends Module {
    #$rootElement
    #$textContainer
    #$timeContainer
    #$startAgainBtn
    #SECONDS_LIMIT
    #clicksCounter
    #$exitBtn
    #$buttonsContainer

    constructor(type, text) {
        super(type, text)
        this.#$rootElement = document.createElement('div');
        this.#$rootElement.classList.add('timer');

        this.#$textContainer = document.createElement('div');
        this.#$textContainer.classList.add('timer__main-text');

        this.#$timeContainer = document.createElement('div');
        this.#$timeContainer.classList.add('timer__seconds');

        this.#$buttonsContainer = document.createElement('div');
        this.#$buttonsContainer.classList.add('btns__container')

        this.#$startAgainBtn = document.createElement('button');
        this.#$startAgainBtn.textContent = 'Начать заново';
        this.#$startAgainBtn.classList.add('timer__btn');
        this.#$startAgainBtn.addEventListener('click', this.#startGame.bind(this))

        this.#$exitBtn = document.createElement('button');
        this.#$exitBtn.textContent = 'Выйти';
        this.#$exitBtn.classList.add('timer__btn', 'timer__exit');
        this.#$exitBtn.addEventListener('click', this.#exit.bind(this))

        this.#$buttonsContainer.append(this.#$startAgainBtn, this.#$exitBtn)
        this.#$rootElement.append(this.#$textContainer, this.#$timeContainer);

        this.#clicksCounter = 0;
        this.#SECONDS_LIMIT = 5;

        document.addEventListener('click', this.#countClicks.bind(this))

    }

    trigger() {
        document.body.append(this.#$rootElement);
        this.#startGame();
    }

    #startGame() {
        if (document.querySelector('.btns__container')) {
            this.#$buttonsContainer.remove();
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
                this.#$rootElement.append(this.#$buttonsContainer);

            }
        }, 1000);
    }

    #countClicks() {
        this.#clicksCounter += 1;
    }

    #exit() {
        this.#$rootElement.remove();
    }
}