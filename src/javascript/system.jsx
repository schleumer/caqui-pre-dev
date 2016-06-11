import axios from 'axios'
import * as reducers from './reducers'
import { combineReducers, bindActionCreators } from 'redux'
import * as actions from './actions'

// THIS IS WRONG, THIS IS SO WRONG
// https://www.youtube.com/v/bW8FbKswSRU&start=101&end=128
// TODO: Another way to do this!
const iconsFile = require('./icons.js')
const body = document.getElementsByTagName('body')[0]
const iconsElement = document.createElement('div')
iconsElement.style.display = 'none'
iconsElement.innerHTML = iconsFile
body.appendChild(iconsElement)

export const reducer = combineReducers(reducers)

export const bind = (dispatch, creators = actions) => {
  return bindActionCreators(creators, dispatch)
}

export const request = (() => {
  const instance = axios.create()

  instance.interceptors.response.use((response) => {
    return response
  }, (error) => Promise.reject(error))

  return instance
})()

export const bounceTime = 300

export const m = (...args) => args.reduce((left, right) => right
    ? Object.assign({}, left, right)
    : left
  , {})

//window._store = store
//window._actions = actions
