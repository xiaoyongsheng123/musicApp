import * as types from './mutation-types'

const matations = {
	[types.SET_SINGER](state, singer) {
		state.singer = singer
	}
}

export default matations