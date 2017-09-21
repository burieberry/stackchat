import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

// ACTION TYPES:
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'ADD_MESSAGE';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

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

// thunk creator
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
        store.dispatch(receiveMessage(newMessage));
        socket.emit('new-message', newMessage);
      });
  }
}

// INITIAL STATE:
const initialState = {
  messages: [],
  newEntry: ''
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
    default:
      return state;
  }
}

// STORE:
const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunkMiddleware));
export default store;
