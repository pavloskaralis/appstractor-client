import { createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import blue from '@material-ui/core/colors/blue'
import grey from '@material-ui/core/colors/grey'


const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[700],
        },
        secondary: blue,
        text: {
            primary: grey[50],
            secondary: grey[500],
        },
        background: {
            default: grey[800],
            paper: grey[900],
            darkPaper: '#2e2e2e'
        },
    }
})

export default theme

