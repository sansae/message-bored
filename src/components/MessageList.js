import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = { messages: [] };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(message)});
    })
  }

  render() {
    return (
      <section>
        <div className="room-title">
          <h1>{this.props.activeRoom}</h1>
        </div>
        <div id="messages">
          {
            this.props.activeRoom ? this.state.messages.map(
              (message, index) =>
              <div key={index}>
                {
                  this.props.activeRoom.includes(message.roomId) ?
                  <div>
                    <p>
                      <span>Username: {message.username}</span>
                      <br></br>
                      <span>Sent At: {message.sentAt}</span>
                      <br></br>
                      Message: {message.content}
                    </p>
                  </div> : ""
                }
              </div>
            ) : ""
          }
        </div>
      </section>
    )
  }
}

export default MessageList;
