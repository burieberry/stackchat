import React, { Component } from 'react';
import store, { postMessage, writeMessage } from '../store';

export default class NewMessageEntry extends Component {

  constructor () {
    super();
    this.state = store.getState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  handleChange (evt) {
    store.dispatch(writeMessage(evt.target.value))
  }

  handleSubmit (evt) {
    evt.preventDefault();

    const { name, newMessageEntry } = this.state;
    const content = newMessageEntry;
    const { channelId } = this.props;

    store.dispatch(postMessage({ name, content, channelId }));
    store.dispatch(writeMessage(''));
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.newMessageEntry}
            onChange={this.handleChange}
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
