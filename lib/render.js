'use strict'

const renderCircle = (ctx, zoom, cx, cy, r, color) => {
	const x = ctx.width * (cx + .5)
	const y = ctx.height * (1 - cy)

	ctx.beginPath()
	ctx.arc(x, y, r * zoom, 0, Math.PI * 2)
	if (color) {
		ctx.fillStyle = color
		ctx.fill()
	}
}

const renderLine = (ctx, zoom, xs, ys, strokeWidth, strokeColor) => {
	const x0 = ctx.width * (xs[0] + .5)
	const y0 = ctx.height * (1 - ys[0])

	ctx.beginPath()
	ctx.moveTo(x0, y0)
	for (let i = 0; i < xs.length; i++) {
		const x = ctx.width * (xs[i] + .5)
		const y = ctx.height * (1 - ys[i])
		ctx.lineTo(x, y)
	}

	ctx.strokeStyle = strokeColor
	ctx.lineWidth = strokeWidth * zoom
	ctx.stroke()
}

const render = (ctx, state, actions) => {
	ctx.clearRect(0, 0, ctx.width, ctx.height)
	const zoom = Math.min(ctx.width, ctx.height)

	for (let fruit of state.fruits) {
		renderCircle(ctx, zoom, fruit.x, fruit.y, fruit.size, fruit.color)
	}

	if (state.cutting) {
		renderLine(ctx, zoom, state.cutTrailX, state.cutTrailY, .005, '#f00')
		renderCircle(ctx, zoom, state.cutX, state.cutY, .01, '#fff')
	}
}

module.exports = render
