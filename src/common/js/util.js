function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
	let _arr = arr.slice()
	for (var i = 0; i < _arr.length; i++) {
		let j = getRandomInt(0, i)
		let t = _arr[i]
		_arr[i] = _arr[j]
		_arr[j] = t
	}
	return _arr
}



// 减少请求的发生，达到节流的效果
export function debounce(func, delay) {
	let timer

	return function (...args) {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}