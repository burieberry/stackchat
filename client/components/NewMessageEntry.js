import React, { Component } from 'react';
import axios from 'axios';
import store, { writeMessage, receiveMessage } from '../store';

export default class NewMessageEntry extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChange(ev) {
    store.dispatch(writeMessage(ev.target.value));
  }

  onSubmit(ev) {
    ev.preventDefault();
    const content = this.state.newEntry;
    const channelId = this.props.channelId;

    axios.post('/api/messages', { content, channelId })
      .then(result => result.data)
      .then(message => store.dispatch(receiveMessage(message)))
  }

  render () {
    const { newEntry } = this.state;
    const { onChange, onSubmit } = this;

    return (
      <form id="new-message-form" onSubmit={ onSubmit }>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            value = { newEntry }
            onChange = { onChange }
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
