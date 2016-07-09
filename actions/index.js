
import * as types from '../constants/ActionTypes'

function receiveRawMessages(rawMessages) {
  return {
    type: types.RECEIVE_RAWMESSAGES,
    rawMessages: rawMessages
  }
}

export function getRawMessages() {
  return (dispatch, getState) => {
    const rawMessages = JSON.parse(localStorage.getItem('messages'));
    dispatch({
      type: types.RECEIVE_RAWMESSAGES,
      rawMessages: rawMessages
    })
  }
}

export function getThreads() {
  return (dispatch, getState) => {
    const rawMessages = getState().rawMessages;
    dispatch({
      type: types.RECEIVE_THREADS,
      rawMessages: rawMessages,
      currentID: "t_3"
    })
  }
}


export function getOrderedThreads() {
  return (dispatch, getState) => {
    const threads = getState().threads;
    dispatch({
      type: types.RECEIVE_ORDERED_THREADS,
      threads: threads
    })
  }
}

export function receiveCurrentID() {
   return (dispatch, getState) => {
    const threads = getState().orderedThreads;
    const thread = threads[threads.length-1]
    console.log("RECEIVE_CURRENTID",thread,thread.id);
    dispatch({
      type: types.RECEIVE_CURRENTID,
      thread: thread
    })
  }
}


export function receiveAllMessages() {
  return (dispatch, getState) => {
    const messages = getState().rawMessages;
    const threadID= getState().currentID;
    dispatch({
      type: types.RECEIVE_ALL_MESSAGES,
      messages:messages,
      currentID:threadID
    })
  }
}



export function getThreadMessages() {
  return (dispatch, getState) => {
    const messages = getState().messages;
    const threadID= getState().currentID;
    dispatch({
      type: types.RECEIVE_THREAD_MESSAGES,
      messages:messages,
      threadID:threadID
    })
  }
}

export function addMessage(value){
  return (dispatch, getState) => {
    const threadID= getState().currentID;
    let message = getCreatedMessageData(value, threadID );
    console.log('message',message);
    dispatch({
      type: types.ADD_MESSAGE,
      message,
      threadID
    })
    
  }
}


 function getCreatedMessageData(text, currentThreadID) {
    let timestamp = Date.now();
    return {
      id: 'm_' + timestamp,
      threadID: currentThreadID,
      authorName: 'Bill', // hard coded for the example
      date: new Date(timestamp),
      text: text,
      isRead: true
    };
  }

export function getCurrentID(threadId) {
    return (dispatch, getState) => {
      dispatch({
        type: types.GET_CURRENTID,
        threadId
      })
  }
}

