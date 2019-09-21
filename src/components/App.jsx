import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {};

  render() {
    const { gon } = this.props;
    return (
      <div className="container">
        <div className="row">
          <ul className="list-group">
            {gon.channels.map(channel => <li key={channel.id}>{channel.name}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}
