import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import Switch from '@material-ui/core/Switch'
import blue from '@material-ui/core/colors/blue'
import Radio from '@material-ui/core/Radio'

const BlueRadio = withStyles({
    root: {
      color: blue[200],
      opacity: .9,
      '&$checked': {
        color: blue[600],
        opacity: 1
      },
    },
    checked: {},
})(Radio)

const BlueSlider = withStyles({
    root: {
        color: blue[600],
    },
    thumb: {
        backgroundColor: blue[600],
    },
    track: {
        height: 3
    },
    rail: {
        backgroundColor: blue[200],
        opacity: .9,
        height: 3
    },
    active: {},
  })(Slider);

  const BlueSwitch = withStyles({
    root:{
        margin: '6px 0',
        marginLeft: 3,
    },
    switchBase: {
        opacity: .9,
        color: blue[200],
        '&$checked': {
            color: blue[600],
        },
        '&$checked + $track': {
            backgroundColor: blue[600],
        },
    },
    checked: {},
    track: {
        color: '#2e2e2e'
    },
  })(Switch);

  export {BlueSlider, BlueSwitch, BlueRadio}