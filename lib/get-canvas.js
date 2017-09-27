'use strict'

const document = require('global/document')
const window = require('global/window')

const getCanvas = () => {
	const canvas = document.createElement('canvas')
	canvas.setAttribute('moz-opaque', '')
	const ctx = canvas.getContext('2d')

	canvas.width = document.body.clientWidth || window.innerWidth
	canvas.height = document.body.clientHeight || window.innerHeight
	ctx.width = canvas.width
	ctx.height = canvas.height

	return {canvas, ctx}
}

module.exports = getCanvas
