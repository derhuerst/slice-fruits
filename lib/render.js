'use strict'

const renderCircle = (ctx, zoom, cx, cy, r, fillColor, strokeWidth, strokeColor) => {
	const x = ctx.width * (cx + .5)
	const y = ctx.height * (1 - cy)

	ctx.beginPath()
	ctx.arc(x|0, y|0, (r * zoom)|0, 0, Math.PI * 2)
	if (fillColor) {
		ctx.fillStyle = fillColor
		ctx.fill()
	}
	if (strokeColor) {
		ctx.strokeStyle = strokeColor
		ctx.lineWidth = strokeWidth * zoom
		ctx.stroke()
	}
}

const renderLine = (ctx, zoom, xs, ys, strokeWidth, strokeColor) => {
	const x0 = ctx.width * (xs[0] + .5)
	const y0 = ctx.height * (1 - ys[0])

	ctx.beginPath()
	ctx.moveTo(x0|0, y0|0)
	for (let i = 0; i < xs.length; i++) {
		const x = (ctx.width * (xs[i] + .5))|0
		const y = (ctx.height * (1 - ys[i]))|0
		ctx.lineTo(x, y)
	}

	ctx.strokeStyle = strokeColor
	ctx.lineWidth = strokeWidth * zoom
	ctx.stroke()
}

const render = (ctx, state, actions) => {
	ctx.clearRect(0, 0, ctx.width, ctx.height)
	const zoom = Math.min(ctx.width, ctx.height)

	if (state.lost) {
		ctx.fillStyle = '#ccc'
		ctx.fillRect(0, 0, ctx.width, ctx.height)
	} else {
		for (let fruit of state.fruits) {
			renderCircle(ctx, zoom, fruit.x, fruit.y, fruit.size, fruit.color)
		}
		for (let bomb of state.bombs) {
			renderCircle(ctx, zoom, bomb.x, bomb.y, bomb.size, '#000', .01, '#f00')
		}
	}

	if (state.cutting) {
		renderLine(ctx, zoom, state.cutTrailX, state.cutTrailY, .008, '#fff')
		renderCircle(ctx, zoom, state.cutX, state.cutY, .01, '#fff')
	}
}

module.exports = render
