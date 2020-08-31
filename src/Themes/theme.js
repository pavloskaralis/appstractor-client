import { createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import blue from '@material-ui/core/colors/blue'
import grey from '@material-ui/core/colors/grey'
import orange from '@material-ui/core/colors/orange'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[700],
        },
        secondary: {
            main: blue[500]
        },
        error: {
            main: orange[400]
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
        MuiDialog: {
            root: {
                '& .MuiPaper-elevation24':{
                    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
                },
                '& .MuiBackdrop-root':{
                    backgroundColor: 'rgba(66,66,66,.5)'
                }
            }
        },
        MuiLinearProgress: {
            colorPrimary: {
                backgroundColor: grey[800]
            },
            barColorPrimary: {
                backgroundColor: grey[50]
            }
        },
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
                },
                '& .MuiFormHelperText-root':{
                    backgroundColor: 'rgb(86, 21, 113)',
                    padding: '4px 14px 0 14px',
                    margin: 0,
                },
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
                flexShrink: 1,
            },
            indicator: {
                backgroundColor: 'rgb(149, 75, 180)'
            }
        },
        MuiTab:{
            root: {
                minWidth: 46,
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
               
                '@media (pointer: coarse)':{
                    padding: 13,
                    width: 'initial',
                    '& .MuiSlider-rail':{
                        width: 204
                    },
                    '& .MuiSlider-track':{
                        width: 204
                    }
                },
                color: blue[500],
            },
            thumb: {
                backgroundColor: blue[500],
            },
            track: {
                height: 3,
            },
            rail: {
                backgroundColor: blue[200],
                opacity: .9,
                height: 3,
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
        },
        MuiSnackbarContent: {
            root: {
                backgroundColor: grey[900],
                color: grey[50]
            }
        }
    }
})

export default theme

