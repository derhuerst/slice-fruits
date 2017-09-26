'use strict'

const document = require('global/document')
const window = require('global/window')

const getCanvas = () => {
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')

	const devicePixelRatio = window.devicePixelRatio || 1
	const backingStoreRatio = ctx.backingStorePixelRatio
		|| ctx.webkitBackingStorePixelRatio
		|| ctx.mozBackingStorePixelRatio
		|| ctx.msBackingStorePixelRatio
		|| ctx.oBackingStorePixelRatio
		|| 1

	canvas.width = document.body.clientWidth || window.innerWidth
	canvas.height = document.body.clientHeight || window.innerHeight

	if (devicePixelRatio !== backingStoreRatio) {
		const ratio = devicePixelRatio / backingStoreRatio
		const { width, height } = canvas
		canvas.width *= ratio
		canvas.height *= ratio
		canvas.style.width = width + 'px'
		canvas.style.height = height + 'px'
		ctx.scale(ratio, ratio)
	}

	return {canvas, ctx}
}

module.exports = getCanvas
