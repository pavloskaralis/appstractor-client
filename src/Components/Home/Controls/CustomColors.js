import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import Switch from '@material-ui/core/Switch'
import blue from '@material-ui/core/colors/blue'
import grey from '@material-ui/core/colors/grey'

const BlueSlider = withStyles({
    root: {
        color: blue,
        height: 8,
    },
    thumb: {
        backgroundColor: blue,
    },
    rail: {
        backgroundColor: grey[500],
        opacity: 1
    },
    active: {},
  })(Slider);

  const BlueSwitch = withStyles({
    switchBase: {
        color: grey[500],
        '&$checked': {
            color: blue,
        },
        '&$checked + $track': {
            backgroundColor: blue,
        },
    },
    checked: {},
    track: {
        color: '#2e2e2e'
    },
  })(Switch);

  export {BlueSlider, BlueSwitch}