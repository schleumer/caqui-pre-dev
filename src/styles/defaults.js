import root from './root';

const stylesheet = {
  input: {
    ...root.text,
    display: 'block',
    width: '100%',
    height: '38px',
    padding: '7px 12px',
    fontSize: '14px',
    lineHeight: '1.42857143',
    backgroundColor: '#ffffff',
    backgroundImage: 'none',
    border: '1px solid #e7e7e7',
    borderRadius: '4px',
    WebkitBoxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
    boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
    WebkitTransition: 'border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s',
    OTransition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s',
    transition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s'
  },
  list: {
    padding: 0,
    margin: 0
  },
  listItem: {
    listStyle: 'none'
  },
  listItemAnchor: {
    padding: '12px',
    display: 'block'
  },
  dropDown: {
    padding: '10px',
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: '1000',
    float: 'left',
    minWidth: '160px',
    listStyle: 'none',
    fontSize: '14px',
    textAlign: 'left',
    backgroundColor: '#ffffff',
    border: '1px solid #cccccc',
    border: '1px solid #e7e7e7',
    borderRadius: '4px',
    WebkitBoxShadow: '0 6px 12px rgba(0, 0, 0, 0.175)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.175)',
    WebkitBackgroundClip: 'padding-box',
    backgroundClip: 'padding-box'
  },
  label: {
    ...root.text,
    display: 'inline-block',
    maxWidth: '100%',
    marginBottom: 5
  }
}

export default stylesheet;