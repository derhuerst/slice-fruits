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

const render = (ctx, state, actions) => {
	ctx.clearRect(0, 0, ctx.width, ctx.height)

	for (let fruit of state.fruits) {
		renderCircle(ctx, fruit.x, fruit.y, fruit.size * 50, fruit.color)
	}
}

module.exports = render
