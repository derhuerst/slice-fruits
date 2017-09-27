'use strict'

const randomColor = require('random-color')

const {round} = require('./helpers')

const GRAVITY = .00018

const randomFruit = () => {
	const x = round(-.3 + Math.random() * .6, 3)

	return {
		size: round(.3 + Math.random() * .2, 2),
		color: randomColor().hexString(),
		x, y: -.1,
		vx: round(-.003 + Math.random() * .006, 4),
		vy: round(-.018 + Math.random() * .003, 4)
	}
}

const createTick = (state) => {
	const tick = () => {
		const t = Date.now()

		const cTX = state.cutTrailX
		cTX[3] = cTX[2]
		cTX[2] = cTX[1]
		cTX[1] = cTX[0]
		cTX[0] = state.cutX
		const cTY = state.cutTrailY
		cTY[3] = cTY[2]
		cTY[2] = cTY[1]
		cTY[1] = cTY[0]
		cTY[0] = state.cutY

		for (let i = 0; i < state.fruits.length; i++) {
			const fruit = state.fruits[i]

			fruit.x += fruit.vx
			fruit.y -= fruit.vy

			if (
				(Math.abs(fruit.x) - fruit.size) > .5 // horizontally out of view
				|| (fruit.y - fruit.size) > 1 // vertically out of view
				|| (fruit.y + fruit.size) < 0 // vertically out of view
			) {
				state.fruits.splice(i--, 1)

				if (state.fruits.length === 0) { // end of burst
					state.endOfLastBurst = t
				}
				continue
			}

			fruit.vy += GRAVITY
		}

		// burst every 500ms
		if (state.fruits.length === 0 && (t - state.endOfLastBurst) >= 500) {
			for (let i = 0; i < 3; i++) {
				state.fruits.push(randomFruit())
			}
		}
	}

	return tick
}

module.exports = createTick
