import {Module} from '../core/module'
import {random} from '../utils'

export class CustomMessageModule extends Module {
  #$rootElement
  #messages
  #elementTimeoutId
  #animationTimeoutID

  constructor(type, text) {
    super(type, text)
    this.#$rootElement = document.createElement('div')
    this.#$rootElement.classList.add('custom-message')
    this.#messages = [
      'Привет, это кастомное сообщение!',
      'Какая сегодня прекрасная погода!',
      `Сейчас ${new Date().toLocaleTimeString("en-GB")}`,
      'Сегодня отличный день!',
      'Тут могла быть ваша реклама.'
    ]
    this.#elementTimeoutId = null
    this.#animationTimeoutID = null
  }

  trigger() {
    if (this.#elementTimeoutId) {
      clearTimeout(this.#elementTimeoutId)
      this.#$rootElement.remove()
    }
    if (this.#animationTimeoutID) {
      clearTimeout(this.#animationTimeoutID)
    }
    
    const randomMessage = this.#messages[random(0, this.#messages.length - 1)]
    this.#$rootElement.textContent = randomMessage
    document.body.appendChild(this.#$rootElement)

    setTimeout(() => {
      this.#$rootElement.style.transform = 'translateY(0)'
    }, 0)

    this.#elementTimeoutId = setTimeout(() => {
      this.#$rootElement.style.transform = 'translateY(100%)'
      this.#animationTimeoutID =setTimeout(() => {
        this.#$rootElement.remove()
      }, 500);
    }, random(1000, 5000))
  }
}
