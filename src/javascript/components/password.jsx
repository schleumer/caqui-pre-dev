import TextInput from './textInput'

/**
 * TODO: PropTypes
 */
class Password extends TextInput {
  static defaultProps = {
    ...TextInput.defaultProps,
    type: 'password'
  }
}

export default Password
