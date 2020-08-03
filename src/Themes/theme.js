import { createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import blue from '@material-ui/core/colors/blue'
import grey from '@material-ui/core/colors/grey'


const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[700],
        },
        secondary: {
            main: blue[500]
        },
        text: {
            primary: grey[50],
            secondary: grey[400],
        },
        background: {
            default: grey[800],
            paper: grey[900],
            darkPaper: '#2e2e2e'
        },
    },
    overrides:{
        MuiMenuItem: {
            root: {
                '&:hover': {
                    backgroundColor: '#2e2e2e',
                    
                },
                '&.Mui-selected': {
                    backgroundColor: 'transparent',
                    color: blue[500],
                    '&:hover':{
                        backgroundColor: '#2e2e2e'
                    }
                }
            },
        },
        MuiButton:{
            label: {
                // textTransform: 'capitalize',
                minWidth: '54px'
            }
        },
        MuiTabs: {
            indicator: {
                backgroundColor: purple[400]
            }
        },
        MuiTab:{
            root: {
                minWidth: 80, // a number of your choice
                width: 80, // a number of your choice
                height: 64,
                minHeight: 64,
                '@media (min-width: 600px)': {
                    minWidth: 80, // a number of your choice
                    width: 80, // a number of your choice
                    height: 64,
                    minHeight: 64,
                }
            },
            
        },
        MuiSlider: {
            root: {
                color: blue[500],
            },
            thumb: {
                backgroundColor: blue[500],
            },
            track: {
                height: 3
            },
            rail: {
                backgroundColor: blue[200],
                opacity: .9,
                height: 3
            },
        },
        MuiSwitch: {
            root:{
                margin: '6px 0',
                marginLeft: 3,
            },
            switchBase: {
                opacity: .9,
                color: blue[200],
                '&$checked': {
                    color: blue[500],
                },
                '&$checked + $track': {
                    backgroundColor: blue[500],
                },
            },
            checked: {},
            track: {
                color: '#2e2e2e'
            },
        },
        MuiRadio: {
            root: {
                color: blue[200],
                opacity: .9,
                '&$checked': {
                    color: blue[500],
                    opacity: 1
                },
            },         
        },
        MuiSelect: {
            root: {
                color: blue[500],
            },
           
            icon: {
                color: grey[50],
            },
        },
        MuiFormControlLabel: {
            label: {
                color: grey[400],
                fontSize: 14,
                marginLeft: 6
            }
        }
    }
})

export default theme

