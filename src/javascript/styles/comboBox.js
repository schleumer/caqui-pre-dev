import defaults from './defaults';

const root = {
  holder: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '100%',
    position: 'relative'
  },
  label: {
    ...defaults.label
  }
};

const dropDown = {
  holder: {
    userSelect: 'none'
  },
  menu: {
    ...defaults.dropDown,
    left: -10,
    top: -10,
    right: -10,
    minWidth: undefined
  },
  list: {
    ...defaults.list
  },
  listSearch: {
    ...defaults.listItem
  },
  listSearchInput: {
    ...defaults.input
  },
  listItem: {
    ...defaults.listItem
  },
  listItemSelected: {

  },
  listItemActive: {

  },
  listItemAnchor: {
    ...defaults.listItemAnchor
  },
  listItemAnchorSelected: {

  },
  listItemAnchorActive: {

  },
  text: {
    ...defaults.listItem,
    ...defaults.listItemAnchor
  },
  footerText: {
    ...defaults.listItem,
    ...defaults.listItemAnchor
  },
  divider: {
    ...defaults.listItem,
    ...defaults.listItemAnchor
  }
};

const shadow = {
  display: {
    ...defaults.input,
    height: 'auto',
    position: 'relative'
  },
  displayLabel: {

  },
  displayIcon: {
    position: 'absolute',
    top: '5px',
    right: '5px'
  }
}

export default {
  dropDown,
  shadow,
  root
}