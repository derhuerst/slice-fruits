'use strict'

const document = require('global/document')
const window = require('global/window')
const raf = require('raf')
// const debounce = require('lodash/debounce')

const getCanvas = require('./lib/get-canvas')
const createTick = require('./lib/tick')
const renderGame = require('./lib/render')
const renderCutTrail = require('./lib/cut-trail')

const state = {
	endOfLastBurst: 0,
	fruits: []
}

const actions = {
}

const {canvas, ctx} = getCanvas()
canvas.style.position = 'absolute'
canvas.style.left = '0'
canvas.style.top = '0'
canvas.style.width = '100%'
canvas.style.height = '100%'
document.body.appendChild(canvas)

renderCutTrail(state, canvas, ctx)
const tick = createTick(state)
setInterval(tick, 10)

const render = () => {
	raf(render)

	const s = performance.now()

	ctx.clearRect(0, 0, canvas.width, canvas.height)
	renderGame(ctx, state, actions)

	const t = performance.now() - s
	if (process.env.NODE_ENV === 'dev' && (t|0) >= 5) {
		console.warn('rendering took', t|0, 'ms')
	}
}
render()
