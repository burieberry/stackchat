import React, { Component } from 'react';
import store, { nameCreator } from '../store';

class NameEntry extends Component{
  constructor() {
    super();
    this.state = store.getState();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChange(ev) {
    store.dispatch(nameCreator(ev.target.value));
  }

  onSubmit(ev) {
    ev.preventDefault();
  }

  render() {
    const { onChange, onSubmit } = this;
    const { name } = this.state;

    return (
      <form className="form-inline" onSubmit={ onSubmit }>
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
          value={ name }
          onChange={ onChange }
        />
      </form>
    );
  }
}

export default NameEntry;
