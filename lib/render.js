'use strict'

const renderCircle = (ctx, cx, cy, r, color) => {
	const x = ctx.width * (cx + .5)
	const y = ctx.height * (1 - cy)

	ctx.beginPath()
	ctx.arc(x, y, r, 0, Math.PI * 2)
	if (color) {
		ctx.fillStyle = color
		ctx.fill()
	}
}

const renderLine = (ctx, xs, ys, strokeWidth, strokeColor) => {
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
	ctx.lineWidth = strokeWidth
	ctx.stroke()
}

const render = (ctx, state, actions) => {
	ctx.clearRect(0, 0, ctx.width, ctx.height)

	for (let fruit of state.fruits) {
		renderCircle(ctx, fruit.x, fruit.y, fruit.size * 50, fruit.color)
	}

	if (state.cutting) {
		renderLine(ctx, state.cutTrailX, state.cutTrailY, 3, '#f00')
		renderCircle(ctx, state.cutX, state.cutY, 7, '#fff')
	}
}

module.exports = render
