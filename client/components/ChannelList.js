import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';

const ChannelList = (props) => {
  const { messages, channels } = props;

  return (
    <ul>
      {
        channels.map(channel => {
          return (
            <li>
              <NavLink to={ `/channels/${ channel.id }`} activeClassName="active">
                <span># ${ channel.name }</span>
                <span className="badge">{ messages.filter(message => message.channelId === channel.id).length }</span>
              </NavLink>
            </li>
          );
        })
      }

      <li>
        <NavLink to="/new-channel">Create a channel...</NavLink>
      </li>
    </ul>
  );
}

const mapStateToProps = (store) => {
  return {

  }
};

const ChannelListContainer = connect(mapStateToProps)(ChannelList);

export default ChannelListContainer;

