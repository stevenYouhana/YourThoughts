// App.js
import React from 'react'
import Api from '../../util/Api';
import { useAlert } from 'react-alert'

const SubmitHandle = (props) => {
  const alert = useAlert()
  return (
    <button id="btn-submit"
      onClick={() => {
        const thought = document.querySelector('#thought-input').value;
        const email =  document.querySelector('#user-email-field').value;
        const word = props.wordToday;

        if (!thought || !email) return alert.show("fill in all fields to submit");
        if (!props.validateEmail(email)) return alert.show("invalid email address!");

        let existingEntry = false;
        for (let i=0; i<3; i++) {
          existingEntry = localStorage.key(i) ? true : false;
        }
        const setLocalStorage = (data) => {
          localStorage.removeItem('clientIp');
          localStorage.removeItem('word');
          localStorage.removeItem('email');
          localStorage.setItem('clientIp', data.ip);
          localStorage.setItem('word', word);
          localStorage.setItem('email', email);
        }

        Api.getLocation().then(result => {
          if (existingEntry) {
            const prevWord = localStorage.getItem('word');
            const prevEmail = localStorage.getItem('email');
            const prevIp = localStorage.getItem('clientIp');
            if (prevIp !== result.ip ||
              prevWord !== word ||
              prevEmail !== email) {
              Api.newRecord({
                email: email,
                word: word,
                thought: thought,
                region: props.location,
              });
              setLocalStorage(result);
            }
            else {
              alert.show("Thanks! You have already sent your thought to this word");
              setLocalStorage(result);
            }
        }
        else {
            Api.newRecord({
              email: email,
              word: word,
              thought: thought,
              region: props.region,
              lon: props.lon,
              lat: props.lat
            });
            setLocalStorage(result);
        }
      });

      Api.othersFor(props.wordToday).then(response => {
          props.getOthers(response);
       });
       props.showOthers();
      }}
    >
      Send
    </button>
  )
}

export default SubmitHandle
