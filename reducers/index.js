import { combineReducers } from 'redux'
import ChatMessageUtils from '../utils/ChatMessageUtils'

const initialState = {
  rawMessages: [],
  threads: {},
  orderedThreads: [],
  currentID: 't_3',
  unreadCount: null,
  messages:{},
  threadMessages: {}
}


function receiveRawMessages(state = initialState.rawMessages, action) {
  switch (action.type) {
    case 'RECEIVE_RAWMESSAGES':
      return action.rawMessages
    default:
      return state
  }
}

function receriveThreads(state = initialState.threads, action) {
  switch (action.type) {
    case 'RECEIVE_THREADS':
    	  let _threads= state;
        let _currentID= action.currentID;
	      action.rawMessages.forEach(function(message) {
	      let threadID = message.threadID;
	      let thread = _threads[threadID];
	      if (thread && thread.lastMessage.timestamp > message.timestamp) {
	        return;
	      }
	      _threads[threadID] = {
	        id: threadID,
	        name: message.threadName,
	        lastMessage: ChatMessageUtils.convertRawMessage(message, _currentID)
	      };
	    }, this);
	      return _threads;

    default:
      return state
  }
}

function receiveOrderedThreads(state= initialState.orderedThreads, action) {
  switch (action.type) {
    case 'RECEIVE_ORDERED_THREADS':
      let _threads= action.threads;
      let orderedThreads = [];
      for (var id in _threads) {
        var thread = _threads[id];
        orderedThreads.push(thread);
      }
      orderedThreads.sort((a, b) => a-b);
      return orderedThreads;
    default:
      return state
  }
}


function receriveAllMessages(state = initialState.messages, action) {
  switch (action.type) {
    case 'RECEIVE_ALL_MESSAGES':
        let _messages = {};
        let currentID= action.currentID;
        console.log('action.messages',action.messages);
        action.messages.forEach(function(message) {
            if (!_messages[message.id]) {
              _messages[message.id] = ChatMessageUtils.convertRawMessage(
              message,
              currentID
              );
            }
        });
        return _messages;

    default:
      return state
  }
}

function receriveThreadMessages(state = initialState.threadMessages, action) {
  switch (action.type) {
    case 'RECEIVE_THREAD_MESSAGES':
        let threadMessages = {};
        let _messages= action.messages;
        for (let id in _messages) {
          threadMessages[_messages[id].threadID] = threadMessages[_messages[id].threadID] || [];
          threadMessages[_messages[id].threadID].push(_messages[id]);
        }
        for (let id in threadMessages) {
          threadMessages[id].sort((a, b) => a-b);
        }
        return threadMessages;

    case 'ADD_MESSAGE':
        let thread= action.threadID;
        return Object.assign({}, state,
            { [thread]: [ ...state[action.threadID], action.message] }
        )
        
    default:
      return state
  }
}


function receiveCurrentID(state = initialState.currentID, action) {
  switch (action.type) {
    case 'RECEIVE_CURRENTID':
      return action.thread.id;
    case 'GET_CURRENTID':
      return action.threadId;
    default:
      return state;
  }
}

/*function addMessage(state, action) {
  switch (action.type) {
     case 'ADD_MESSAGE':
        return 
          { ...state.threadMessages,
            action.threadID: [ ...state.threadMessages[action.threadID], action.message]
          }
        
     default:
      return state;
  }
}
*/


export default combineReducers({
  rawMessages: receiveRawMessages,
  threads: receriveThreads,
  orderedThreads: receiveOrderedThreads,
  messages:  receriveAllMessages,
  threadMessages: receriveThreadMessages,
  currentID: receiveCurrentID
})

