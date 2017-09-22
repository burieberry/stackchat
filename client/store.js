import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

// ACTION TYPES:
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'ADD_MESSAGE';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const NEW_NAME = 'NEW_NAME';

// ACTION CREATORS:
export function gotMessagesFromServer(messages) {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages
  }
}

export function writeMessage(input) {
  return {
    type: WRITE_MESSAGE,
    newEntry: input
  }
}

export function receiveMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    message
  }
}

export function nameCreator(name) {
  return {
    type: NEW_NAME,
    name
  }
}

// thunk creators
export function fetchMessages() {
  return function thunk(dispatch) {
    return axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => dispatch(gotMessagesFromServer(messages)));
  }
}

export function postMessage(message) {
  return function thunk(dispatch) {
    return axios.post('/api/messages', message)
      .then(result => result.data)
      .then(newMessage => {
        dispatch(receiveMessage(newMessage));
        socket.emit('new-message', newMessage);
      });
  }
}

export function postName(name) {
  return function thunk(dispatch) {
    return axios.post('/api/messages', name)
      .then(res => res.data)
      .then(newName => dispatch(nameCreator(newName)));
  }
}

// INITIAL STATE:
const initialState = {
  messages: [],
  newEntry: '',
  name: ''
};

// REDUCER:
function reducer(state = initialState, action) {
  switch(action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, { messages: action.messages });
    case WRITE_MESSAGE:
      return Object.assign({}, state, { newEntry: action.newEntry });
    case RECEIVE_MESSAGE:
      return Object.assign({}, state, { messages: state.messages.concat(action.message) });
    case NEW_NAME:
      return Object.assign({}, state, { name: action.name });
    default:
      return state;
  }
}

// STORE:
const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunkMiddleware));
export default store;
