'use strict'

const listen = require('the-listener').default
// const debounce = require('lodash/debounce')

const watch = (state, canvas, ctx) => {
	state.cutting = false
	state.cutX = state.cutY = null
	state.cutTrailX = [null, null, null, null]
	state.cutTrailY = [null, null, null, null]

	const onMove = (cX, cY, resetTrail) => {
		const x = cX === null ? null : cX / ctx.width - .5
		const y = cY === null ? null : 1 - (cY / ctx.height)

		if (resetTrail) {
			const cTX = state.cutTrailX
			cTX[0] = cTX[1] = cTX[2] = cTX[3] = x
			const cTY = state.cutTrailY
			cTY[0] = cTY[1] = cTY[2] = cTY[3] = y
		}
		state.cutX = x
		state.cutY = y
	}

	listen(canvas, {
		touchstart: (e) => {
			state.cutting = true
			const t = e.targetTouches[0]
			onMove(t.clientX, t.clientY, true)
		},
		touchmove: (e) => {
			e.preventDefault()
			const t = e.targetTouches[0]
			onMove(t.clientX, t.clientY)
		},
		touchend: (e) => {
			const t = e.changedTouches[0]
			onMove(null, null, true)
			state.cutting = false
		},
		touchcancel: (e) => {
			const t = e.targetTouches[0]
			onMove(null, null, true)
			state.cutting = false
		},

		mousedown: (e) => {
			state.cutting = true
			onMove(e.clientX, e.clientY, true)
		},
		mousemove: (e) => {
			if (!state.cutting) return
			onMove(e.clientX, e.clientY)
		},
		mouseup: (e) => {
			if (!state.cutting) return
			onMove(null, null, true)
			state.cutting = false
		}
	})
}

module.exports = watch
