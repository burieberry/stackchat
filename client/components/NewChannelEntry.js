import React from 'react';
import { connect } from 'react-redux';
import { addChannel, postChannel } from '../store';

const NewChannelEntry = (props) => {
  const { newChannelEntry, onChange, onSubmit } = props;
  return (
    <form onSubmit={ onSubmit }>
      <div className="form-group">
        <label htmlFor="name">Create a Channel</label>
        <input className="form-control" type="text" name="channelName" placeholder="Enter channel name" value={ newChannelEntry } onChange={ onChange } />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Create Channel</button>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    newChannelEntry: state.newChannelEntry
  }
};

const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    onChange(ev) {
      dispatch(addChannel(ev.target.value));
    },
    onSubmit(ev) {
      ev.preventDefault();
      const name = ev.target.channelName.value;
      dispatch(postChannel({ name }, ownprops.history));
      dispatch(addChannel(''));
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(NewChannelEntry);
export default Container;

