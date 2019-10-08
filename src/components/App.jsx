import React from 'react';
import SideBar from './SideBar';
import Messages from './Messages';

export default class App extends React.Component {
  render() {
    return (
      <div className="d-flex">
        <SideBar />
        <Messages />
      </div>
    );
  }
}
