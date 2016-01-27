import colors from './colors';

import defaults from './defaults';

export default {
  default: {
    ...defaults.button,
    color: '#555555',
    backgroundColor: colors.grayLighter,
    borderColor: '#e2e2e2' // TODO: fix
  },
  primary: {

  },
  success: {

  },
  info: {

  },
  warning: {

  },
  danger: {

  },
  sizes: {
    default: {},
    large: {},
    small: {},
    extraSmall: {}
  },
  variants: {
    focused: {
      default: {
        marginTop: '1px',
        borderWidth: '0 1px 3px 1px'
      }
    },
    hovered: {
      default: {
        marginTop: '1px',
        borderWidth: '0 1px 3px 1px'
      }
    },
    pressed: {
      default: {
        marginTop: '2px',
        borderWidth: '0 1px 2px 1px',
        WebkitBoxShadow: 'none',
        boxShadow: 'none',
        color: '#555555',
        backgroundColor: '#d5d5d5',
        borderColor: '#c3c3c3'
      }
    }
  }
}