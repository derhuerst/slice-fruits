'use strict'

const round = (x, d = 0) => {
	const p = Math.pow(10, d)
	return Math.round(x * p) / p
}

module.exports = {round}
