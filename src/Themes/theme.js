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
        default: {
            main: 'red'
        },
        text: {
            primary: grey[50],
            secondary: grey[400],
        },
        background: {
            default: grey[800],
            paper: grey[900],
            darkDefault: '#2e2e2e'
        },
    },
    overrides:{
        MuiTextField:{
            root:{
                backgroundColor: grey[50],
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                marginBottom: 16,
                '& .MuiFormLabel-root':{
                    color: 'rgba(0, 0, 0, 0.54)'
                },
                '& .MuiInputBase-root': {
                    color: 'rgba(0,0,0,.87)'
                },
                '& .MuiFilledInput-root':{
                    backgroundColor: 'transparent'
                }
            }
        },
        MuiAppBar: {
            root: {
                zIndex: 1201
            }
        },
        MuiBottomNavigation:{
            root: {
                backgroundColor: purple[700],

            }
        },
        MuiBottomNavigationAction:{
            root: {
                minWidth: 64,
                '&.Mui-selected': {
                    color: grey[50],
                }
            }
        },
        MuiMenuItem: {
            root: {
                minWidth: 102,
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
                minWidth: '54px'
            },  
        },
        MuiTabs: {
            root:{
                flexShrink: 2,
            },
            indicator: {
                backgroundColor: purple[400]
            }
        },
        MuiTab:{
            root: {
                minWidth: 56,
                width: 120,
                flexShrink: 1,
                height: 56,
                minHeight: 56,
                '@media (min-width: 600px)': {
                    minWidth: 80,
                    width: 160,
                    flexShrink: 1,
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
                padding: 8.5,
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

