import React from 'react';
import TextInput from './textInput';

class Password extends TextInput {
    static defaultProps = {
        ...TextInput.defaultProps,
        type: 'password'
    }
}

export default Password;
