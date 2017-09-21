import { createStore } from 'redux';

// ACTION TYPES:
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

// ACTION CREATORS:
export function gotMessagesFromServer(messages) {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages
  }
};

// INITIAL STATE:
const initialState = {
  messages: []
};

// REDUCER:
function reducer(state = initialState, action) {
  switch(action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, { messages: action.messages });
    default:
      return state;
  }
}

// STORE:
const store = createStore(reducer);
export default store;


