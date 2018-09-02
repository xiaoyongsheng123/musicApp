import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

function insertArray(arr, val, compare, maxLen) {
	// 判断数组中有没有字段
	const index = arr.findIndex(compare)
	if (index === 0) {
		return
	}
	// 有的话删除再插入
	if (index > 0) {
		arr.splice(index, 1)
	}
	arr.unshift(val)
	// 如果超过长度限制，从数组剔除后面的字段
	if (maxLen && arr.length > maxLen) {
		arr.pop()
	}
}

function deleteFromArray(arr, compare) {
	const index = arr.findIndex(compare)
	if (index > -1) {
		arr.splice(index, 1)
	}
}

export function saveSearch(query) {
	let searches = storage.get(SEARCH_KEY, [])
	insertArray(searches, query, (item) => {
		return item === query
	}, SEARCH_MAX_LENGTH)
	storage.set(SEARCH_KEY, searches)
	return searches
}

// 去本地读取已保存的数据
export function loadSearch() {
	return storage.get(SEARCH_KEY, [])
}

export function deleteSearch(query) {
	let searches = storage.get(SEARCH_KEY, [])
	deleteFromArray(searches, (item) => {
		return item === query
	})
	storage.set(SEARCH_KEY, searches)
	return searches
}

export function clearSearch() {
	storage.remove(SEARCH_KEY)
	return []
}