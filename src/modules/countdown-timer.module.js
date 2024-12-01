import { Module } from '../core/module'

export class CountdownTimerModule extends Module {
	#$rootElement
	#time

	constructor(type, text) {
		super(type, text)
		this.#$rootElement = document.createElement('div')
		this.#$rootElement.className = 'countdown-timer'
	}

	trigger() {
		this.#time = Number(prompt('Укажите время обратного отсчета'))
		if (this.#time) {
			document.body.append(this.#$rootElement)
			this.#$rootElement.innerText = this.#time
			this.startTimer()
			setTimeout(this.showTimerEndMessage, this.#time * 1000)
		}
	}

	startTimer() {
		const timer = setInterval(() => {
			if (this.#time <= 1) {
				clearInterval(timer)
				this.#$rootElement.remove()
			} else {
				this.#time--
				this.#$rootElement.innerText = this.#time
			}
		}, 1000)
	}

	showTimerEndMessage = () => {
		const messageItem = document.createElement('div')
		messageItem.className = 'timer-message'
		messageItem.innerText = 'Время вышло'
		const buttonItem = document.createElement('button')
		buttonItem.className = 'timer-button'
		buttonItem.innerText = 'ОК'

		buttonItem.addEventListener('click', () => {
			messageItem.remove()
		})

		messageItem.append(buttonItem)
		document.body.append(messageItem)
	}
}