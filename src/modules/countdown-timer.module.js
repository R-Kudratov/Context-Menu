import { Module } from '../core/module'
import { startTimer } from '../utils'
import { showTimerEndMessage } from '../utils'

export class CountdownTimerModule extends Module {
	#$rootElement
	#time
	#message

	constructor(type, text) {
		super(type, text)
		this.#$rootElement = document.createElement('div')
		this.#$rootElement.className = 'countdown-timer'
		this.#message = 'Время вышло'
	}

	trigger() {
		this.#time = Number(prompt('Укажите время обратного отсчета'))
		if (this.#time) {
			document.body.append(this.#$rootElement)
			this.#$rootElement.innerText = this.#time
			startTimer(this.#$rootElement, this.#time)
			setTimeout(showTimerEndMessage, this.#time * 1000, this.#message)
		}
	}
}