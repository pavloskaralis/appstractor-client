function setShadowOpacity(payload) {
	return {
		type: 'SET_SHADOW_OPACITY',
		payload
	}
}

function setShadowAngle(payload) {
	return {
		type: 'SET_SHADOW_ANGLE',
		payload
	}
}

function setShadowSize(payload) {
	return {
		type: 'SET_SHADOW_SIZE',
		payload
	}
}

export {setShadowOpacity, setShadowAngle, setShadowSize}