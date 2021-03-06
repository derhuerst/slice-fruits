'use strict'

const randomColor = require('random-color')
const lineCircleCollision = require('line-circle-collision')

const {round} = require('./helpers')

const GRAVITY = .0002
const BOMB_CHANCE = .3

const randomFruit = () => {
	const x = round(-.3 + Math.random() * .6, 3)

	return {
		size: round(.05 + Math.random() * .04, 3),
		color: randomColor().hexString(),
		x, y: -.1,
		vx: round(-.003 + Math.random() * .006, 4),
		vy: round(-.018 + Math.random() * .003, 4),
		movingIn: true
	}
}

const randomBomb = () => {
	return {
		size: .05,
		x: round(-.3 + Math.random() * .6, 3),
		y: -.1,
		vx: round(-.003 + Math.random() * .006, 4),
		vy: round(-.018 + Math.random() * .003, 4),
		movingIn: true
	}
}

const createTick = (state) => {
	const tick = () => {
		if (state.lost) return
		const t = Date.now()

		// move cut trail
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

		const checkForCuttings = state.cutX !== null && state.cutY !== null
		const a = [state.cutX, state.cutY]
		const b = [cTX[0], cTY[0]]

		// move bombs & check if sliced
		for (let i = 0; i < state.bombs.length; i++) {
			const bomb = state.bombs[i]

			bomb.x += bomb.vx
			bomb.y -= bomb.vy

			const c = [bomb.x, bomb.y]
			if (checkForCuttings && lineCircleCollision(a, b, c, bomb.size)) {
				state.lost = true
				state.fruits = []
				return
			}

			const outOfView = (
				(Math.abs(bomb.x) - bomb.size) > .5 // horizontally out of view
				|| (bomb.y - bomb.size) > 1 // vertically out of view
				|| (bomb.y + bomb.size) < 0 // vertically out of view
			)
			if (outOfView) {
				if (!bomb.movingIn) {
					state.bombs.splice(i--, 1)
					continue
				}
			} else {
				bomb.movingIn = false
			}

			bomb.vy += GRAVITY
		}

		// move fruits & check if sliced
		for (let i = 0; i < state.fruits.length; i++) {
			const fruit = state.fruits[i]

			fruit.x += fruit.vx
			fruit.y -= fruit.vy

			const c = [fruit.x, fruit.y]
			if (checkForCuttings && lineCircleCollision(a, b, c, fruit.size)) {
				// console.log('collision', fruit.color, state.cutX, state.cutY)
				state.fruits.splice(i--, 1)
				if (state.fruits.length === 0) { // no fruits left
					state.endOfLastBurst = t
				}
				continue
			}

			const outOfView = (
				(Math.abs(fruit.x) - fruit.size) > .5 // horizontally out of view
				|| (fruit.y - fruit.size) > 1 // vertically out of view
				|| (fruit.y + fruit.size) < 0 // vertically out of view
			)
			if (outOfView) {
				if (!fruit.movingIn) {
					state.fruits.splice(i--, 1)
					if (state.fruits.length === 0) { // end of burst
						state.endOfLastBurst = t
					}
					continue
				}
			} else {
				fruit.movingIn = false
			}

			fruit.vy += GRAVITY
		}

		// burst new fruits every 500ms
		if (state.fruits.length === 0 && (t - state.endOfLastBurst) >= 500) {
			if (Math.random() < BOMB_CHANCE) {
				state.bombs.push(randomBomb())
			}
			for (let i = 0; i < 3; i++) {
				state.fruits.push(randomFruit())
			}
		}
	}

	return tick
}

module.exports = createTick
