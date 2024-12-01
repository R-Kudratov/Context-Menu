import {Module} from '../core/module'
import {random} from '../utils'

export class CustomMessageModule extends Module {
  #$rootElement
  #elementTimeoutId
  #animationTimeoutID

  constructor(type, text) {
    super(type, text)
    this.#$rootElement = document.createElement('div')
    this.#$rootElement.classList.add('custom-message', 'with-shadow')
    this.#elementTimeoutId = null
    this.#animationTimeoutID = null
  }

  trigger() {
    if (this.#elementTimeoutId) {
      this.#removeElement(this.#elementTimeoutId)
    }
    if (this.#animationTimeoutID) {
      this.#removeElement(this.#animationTimeoutID)
    }
    
    this.#createRandomMessageElement(this.#$rootElement)
    
    setTimeout(() => {
      this.#$rootElement.style.transform = 'translateY(0)'
    }, 0)

    this.#elementTimeoutId = setTimeout(() => {
      this.#$rootElement.style.transform = 'translateY(100%)'
      this.#animationTimeoutID = setTimeout(() => {
        if (this.#$rootElement) this.#$rootElement.remove()
      }, 500)
    }, random(1000, 5000))
  }

  #createRandomMessageElement(element) {
    const messages = [
      'Привет, это кастомное сообщение!',
      `Сейчас ${new Date().toLocaleTimeString("en-GB")}`,
      'Тут могла быть ваша реклама',
      'Lorem ipsum dolor sit amet',
      `Ваш браузер ${navigator.userAgentData.brands[0].brand} версии ${navigator.userAgentData.brands[0].version}`,
      `Ваша система ${navigator.userAgentData.platform}`,
    ]
    element.textContent = messages[random(0, messages.length - 1)]
    document.body.appendChild(element)
  }

  #removeElement(timeoutId) {
    clearTimeout(timeoutId)
    this.#$rootElement.remove()
  }
}
