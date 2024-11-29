import {Module} from '../core/module'
import {getRandomColor} from '../utils'

export class BackgroundModule extends Module {
  trigger() {
    const $rootElement = document.body
    $rootElement.style.background = getRandomColor()
  }
}
