import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import { getCurrentID } from '../actions'
import { connect } from 'react-redux'

class ListItem extends Component {

	render() {
		const  { thread, currentThreadID  } = this.props;
		let lastMessage = thread.lastMessage;
	    return (
	      <li
	        className={classNames({
	          'thread-list-item': true,
	          'active': thread.id === currentThreadID
	        })}
	        onClick={() => this.props.getCurrentID(thread.id)}
	        >
	        <h5 className="thread-name">{thread.name}</h5>
	        <div className="thread-time">
	          {lastMessage.date.toLocaleTimeString()}
	        </div>
	        <div className="thread-last-message">
	          {lastMessage.text}
	        </div>
	      </li>
	    );
	}
}


function mapStateToProps(state) {
  return {
    
  }
}
const ThreadListItem = connect(   mapStateToProps,
  { getCurrentID })(ListItem)

export default ThreadListItem