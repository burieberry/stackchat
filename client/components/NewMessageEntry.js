import React, { Component } from 'react';
import store, { writeMessage, receiveMessage, postMessage } from '../store';

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
    const newMessage = {
      content,
      channelId
    }
    store.dispatch(postMessage(newMessage));
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
