import React, {Component} from 'react'
import MessageSectionContainer from './MessageSectionContainer'
import ThreadSectionContainer from './ThreadSectionContainer'

class App extends Component {

	render() {
		return (
			<div className="chatapp">
	        	<ThreadSectionContainer />
				<MessageSectionContainer />
      		</div>
		);
	}
}

export default App;
