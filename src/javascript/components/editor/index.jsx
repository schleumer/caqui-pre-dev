import React from 'react'
import { MegadraftEditor, editorStateFromRaw } from 'megadraft'

class CaquiEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorState: editorStateFromRaw(null) }
    this.onChange = ::this.onChange
  }

  onChange(editorState) {
    this.setState({ editorState })
  }

  render() {
    return (
      <MegadraftEditor
        placeholder="Digite seu texto aqui"
        editorState={this.state.editorState}
        onChange={this.onChange}/>
    )
  }
}

export default CaquiEditor
