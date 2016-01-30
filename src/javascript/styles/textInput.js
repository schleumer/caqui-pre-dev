import defaults from './defaults';

import colors from  './colors';

//import { toRgba } from 

export default {
  label: {
    ...defaults.label
  },
  normal: {
    ...defaults.input
  },
  focused: {
    border: `1px solid ${colors.brandPrimary}`,
    WebkitBoxShadow: `inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6)`,
    boxShadow: `inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6)`
  }
}