import { Module } from '../core/module'
import { random } from '../utils'

export class SoundModule extends Module {
	trigger() {
		const $rootElement = new Audio(`../../assets/sounds/sound${random(1, 8)}.mp3`)
		$rootElement.addEventListener('loadeddata', () => {
			$rootElement.play()
		})
	}
}