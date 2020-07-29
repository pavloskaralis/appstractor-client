const initialCanvasState = {
    //upload/link/stock
    imageSource: 'https://cdn.pixabay.com/photo/2016/11/23/15/18/amsterdam-1853459_1280.jpg',
    //sliders: units2
    rowQuanity: 4,
    blockQuantity: 6,
    stripeQuantity: 3,
    //toggle: only horizontal, only vertical, woven, default (random)
    stripeDirection: 'woven',
    //slider: background detail 
    backgroundDetail: 1000000,
    //toggles: stripe shape, background compression, block unity
    stripeShape:  true,
    backgroundCompression: false, 
    blockUniformity: true,
    //sliders: shadow intensity, angle, diffusion
    shadowIntensity: .5,
    shadowAngle: .01,
    shadowDiffusion: .01,
}

export default function canvasReducer(state = initialCanvasState,action){
    switch(action.type){
        case 'UPDATE_IMAGE_SOURCE':
            return {...state, imageSource: action.imageSource}
        case 'SET_ROW_QUANTITY':
            return {...state, rowQuanity: action.rowQuanity}
        case 'SET_BLOCK_QUANTITY':
            return {...state, blockQuanity: action.blockQuanity}
        case 'SET_STRIPE_QUANTITY':
            return {...state, stripeQuanity: action.stripeQuanity}
        case 'TOGGLE_STRIPE_DIRECTION':
            return {...state, stripeDirection: action.stripeDirection}
        case 'SET_BACKGROUND_DETAIL':
            return {...state, backgroundDetail: action.backgroundDetail}
        case 'TOGGLE_STRIPE_SHAPE':
            return {...state, stripeShape: action.stripeShape}
        case 'TOGGLE_BACKGROUND_COMPRESSION':
            return {...state, backgroundCompression: action.backgroundCompression}
        case 'TOGGLE_BLOCK_UNIFORMITY':
            return {...state, blockUniformity: action.blockUniformity}
        case 'SET_SHADOW_INTENSITY':
            return {...state, shadowIntensity: action.shadowIntensity}
        case 'SET_SHADOW_ANGLE':
            return {...state, shadowAngle: action.shadowAngle}
        case 'SET_SHADOW_DIFFUSION':
            return {...state, shadowDiffusion: action.shadowDiffusion}
        default:
            return state        
    }
}
