function setStripeQuantity(payload) {
	return {
		type: 'SET_STRIPE_QUANTITY',
		payload
	}
}

function setRowQuantity(payload) {
	return {
		type: 'SET_ROW_QUANTITY',
		payload
	}
}

function setBlockQuantity(payload) {
	return {
		type: 'SET_BLOCK_QUANTITY',
		payload
	}
}

export {setRowQuantity, setBlockQuantity, setStripeQuantity}