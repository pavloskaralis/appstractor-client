import { createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import blue from '@material-ui/core/colors/blue'
import grey from '@material-ui/core/colors/grey'

const homeTheme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: blue
    },
    background: {
        background: grey[800],
        paper: grey[900]
    }
})

export default homeTheme