import React, {Component} from 'react'
import { connect } from 'react-redux'
import MessageComposer from '../components/MessageComposer'
import MessageListItem from '../components/MessageListItem'

class MessageSectionContainer extends Component {

  render() {
	   const {messages, thread} = this.props;
     const _messages= messages[thread];
     let messageListItems = _messages.map(message =>
          <MessageListItem
          key={message.id}
          message={message} />
    );

     
    return (
      <div className="message-section">
        <h3 className="message-thread-heading">{thread.name}</h3>
        <ul className="message-list" ref="messageList">
          {messageListItems}
        </ul>
        <MessageComposer threadID={thread.id}/>
      </div>
    )
  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  _scrollToBottom() {
    let ul = this.refs.messageList;
    ul.scrollTop = ul.scrollHeight;
  }
}

function mapStateToProps(state) {
	  return {
  		messages: state.threadMessages,
  		thread: state.currentID
	  }
}


export default connect (
	mapStateToProps
)(MessageSectionContainer);
