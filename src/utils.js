export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(random(0, letters.length - 1))];
  }
  return color;
}

export function startTimer(elem, time) {
	const timer = setInterval(() => {
		if(time <= 1) {
			clearInterval(timer)
			elem.remove()
		} else {
			time--
			elem.innerText = time
		}
	}, 1000)
}

export const showTimerEndMessage = (message) => {
	const messageItem = document.createElement('div')
	messageItem.className = 'timer-message'
	messageItem.innerText = message
	const buttonItem = document.createElement('button')
	buttonItem.className = 'timer-button'
	buttonItem.innerText = 'ОК'

	buttonItem.addEventListener('click', () => {
		messageItem.remove()
	})

	messageItem.append(buttonItem)
	document.body.append(messageItem)
}