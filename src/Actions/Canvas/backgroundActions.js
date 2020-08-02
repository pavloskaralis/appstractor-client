function setBackgroundDetail(payload) {
	return {
		type: 'SET_BACKGROUND_DETAIL',
		payload
	}
}

function toggleBackgroundStretch(payload) {
	return {
		type: 'TOGGLE_BACKGROUND_STRETCH',
		payload
	}
}

function toggleBackgroundEllipse(payload) {
	return {
		type: 'TOGGLE_BACKGROUND_ELLIPSE',
		payload
	}
}

function toggleBackgroundUniform(payload) {
	return {
		type: 'TOGGLE_BACKGROUND_UNIFORM',
		payload
	}
}

export {setBackgroundDetail, toggleBackgroundEllipse, toggleBackgroundStretch, toggleBackgroundUniform}