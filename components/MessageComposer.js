import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../actions'

let ENTER_KEY_CODE = 13;

let MessageComposer = ({ dispatch }) => {
    
    let input;
    return (
        <textarea
          className="message-composer"
          name="message"
          onKeyDown={ e => {
            if (e.keyCode === ENTER_KEY_CODE) {
              console.log('MessageComposer', "entered");
              event.preventDefault();
              if (!input.value.trim()) {
                return
              }
              dispatch(addMessage(input.value))
              input.value = ''
              }
            }
          }
          ref={node => { input = node }}
        />
    );
};

MessageComposer = connect()(MessageComposer);

export default MessageComposer;