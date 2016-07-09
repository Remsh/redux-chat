import React, {Component} from 'react'
import { connect } from 'react-redux'
import ThreadListItem from '../components/ThreadListItem'
import { getOrderedThreads } from '../actions'


//const { threads, currentThreadID, unreadCount } = this.props;
class ThreadSectionContainer extends Component {

	render() {
		const { threads, currentThreadID, unreadCount } = this.props;
		
		let threadListItems = threads.map(thread =>
	        <ThreadListItem
	          key={thread.id}
	          thread={thread}
	          currentThreadID={currentThreadID} />
		);

	    let unread = (unreadCount === 0) ?
	      null :
	      <span>Unread threads: {unreadCount}</span>;

	    return (
	      <div className="thread-section">
	        <div className="thread-count">
	          {unread}
	        </div>
	        <ul className="thread-list">
	          {threadListItems}
	        </ul>
	      </div>
	    );
	}
}

function mapStateToProps(state) {
  return {
    threads: state.orderedThreads
  }
}

export default connect(
  mapStateToProps
)(ThreadSectionContainer)