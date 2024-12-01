import {Module} from '../core/module'

export class RandomQuoteModule extends Module {
  #$rootElement
  #API_URL
  #quoteText
  #quoteAuthor
  #elementTimeoutId
  #animationTimeoutID

  constructor(type, text) {
    super(type, text)
    this.#$rootElement = document.createElement('div')
    this.#$rootElement.classList.add('quote__container', 'with-shadow')
    this.#quoteText = document.createElement('p')
    this.#quoteText.classList.add('quote__text')
    this.#quoteAuthor = document.createElement('p')
    this.#quoteAuthor.classList.add('quote__author')

    this.#elementTimeoutId = null
    this.#animationTimeoutID = null

    this.#API_URL = 'https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json'
  }

  async #fetchQuote() {
    try {
      const response = await fetch(this.#API_URL)
      if (!response.ok) {
        throw new Error()
      }
      return await response.json()
    } catch (error) {
      return null
    }
  }

  async trigger() {
    if (this.#elementTimeoutId) {
      this.#removeElement(this.#elementTimeoutId)
    }
    if (this.#animationTimeoutID) {
      this.#removeElement(this.#animationTimeoutID)
    }

    try {
      const quoteData = await this.#fetchQuote()
      this.#quoteText.textContent = quoteData.quoteText
      this.#quoteAuthor.textContent = quoteData.quoteAuthor
      this.#$rootElement.append(this.#quoteText, this.#quoteAuthor)
      document.body.appendChild(this.#$rootElement)

      
      setTimeout(() => {
        this.#$rootElement.style.opacity = '1'
      }, 0)

      this.#elementTimeoutId = setTimeout(() => {
        this.#$rootElement.style.opacity = '0'
        this.#animationTimeoutID = setTimeout(() => {
          if (this.#$rootElement) this.#$rootElement.remove()
        }, 500)
      }, 10000)

    } catch (error) {
      console.log('Не удалось получить цитату')
    }
  }

  #removeElement(timeoutId) {
    clearTimeout(timeoutId)
    this.#$rootElement.remove()
  }
}
