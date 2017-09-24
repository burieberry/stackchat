import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import socket from './socket';

// INITIAL STATE

const initialState = {
  messages: [],
  name: 'Reggie',
  newMessageEntry: '',
  channels: [],
  newChannelEntry: ''
};

// ACTION TYPES
const UPDATE_NAME = 'UPDATE_NAME';
const GET_MESSAGE = 'GET_MESSAGE';
const GET_MESSAGES = 'GET_MESSAGES';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GET_CHANNELS = 'GET_CHANNELS';
const ADD_CHANNEL = 'ADD_CHANNEL';
const GET_CHANNEL = 'GET_CHANNEL';

// ACTION CREATORS
export function updateName(name) {
  return { type: UPDATE_NAME, name };
}

export function getMessages(messages) {
  return { type: GET_MESSAGES, messages };
}

export function getMessage(message) {
  return { type: GET_MESSAGE, message };
}

export function writeMessage(content) {
  return { type: WRITE_MESSAGE, content };
}

export function getChannels(channels) {
  return { type: GET_CHANNELS, channels }
}

export function getChannel(channel) {
  return { type: GET_CHANNEL, channel }
}

export function addChannel(channelName) {
  return { type: ADD_CHANNEL, channelName }
}

// THUNK CREATORS
export function fetchMessages () {
  return function thunk(dispatch) {
    return axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => dispatch(getMessages(messages)));
  }
}

export function postMessage(message) {
  return function thunk(dispatch) {
    return axios.post('/api/messages', message)
      .then(res => res.data)
      .then(newMessage => {
        dispatch(getMessage(newMessage));
        socket.emit('new-message', newMessage);
      });
  }
}

export function fetchChannels() {
  return function thunk(dispatch) {
    return axios.get('/api/channels')
      .then(res => res.data)
      .then(channels => dispatch(getChannels(channels)));
  }
}

export function postChannel(channel, history) {
  return function thunk(dispatch) {
    return axios.post('/api/channels', channel)
      .then(res => res.data)
      .then(newChannel => {
        dispatch(getChannel(newChannel));
        history.push(`/channels/${ newChannel.id }`);
        socket.emit('new-channel', newChannel);
      });
  }
}

// REDUCER

/**
 * When we use the spread operator on an object, it extracts all of the key-value pairs on that object into a new object!
 * Sound familiar? It acts like Object.assign!
 * For example:
 *    const obj1 = { a: 1 };
 *    const obj2 = { ...obj1, b: 2  }
 *    console.log(obj2) // { a: 1, b: 2 }
 *
 * This is the same result we would have gotten if we had said:
 *    const obj2 = Object.assign({}, obj1, { b: 2 })
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAME:
      return {
        ...state,
        name: action.name
      };

    case GET_MESSAGES:
      return {
        ...state,
        messages: action.messages
      };

    case GET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      };

    case WRITE_MESSAGE:
      return {
        ...state,
        newMessageEntry: action.content
      };

    case GET_CHANNELS:
      return {
        ...state,
        channels: action.channels
      }

    case GET_CHANNEL:
      return {
        ...state,
        channels: [...state.channels, action.channel]
      }

    case ADD_CHANNEL:
      return {
        ...state,
        newChannelEntry: action.channelName
      }

    default:
      return state;
  }

}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);

export default store;
