import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';

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
const store = createStore(reducer, applyMiddleware(loggerMiddleware));
export default store;
