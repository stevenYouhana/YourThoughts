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
        const word = props.selectedWord;

        if (!thought || !email) return alert.show("fill in all fields to submit");
        if (!props.validateEmail(email)) return alert.show("invalid email address!");

        let existingEntry = false;
        for (let i=0; i<3; i++) {
          // console.log("localStorage.key(i) ",localStorage.key(i))
          existingEntry = localStorage.key(i) ? true : false;
        }

        const setLocalStorage = (data) => {
          localStorage.removeItem('clientIp');
          // localStorage.removeItem('words');
          localStorage.removeItem('email');
          localStorage.setItem('clientIp', data.ip);
          if (localStorage.getItem('words')) {
              localStorage.setItem('words', [localStorage.getItem('words'), word]);
          }
          else localStorage.setItem('words', [word]);

          console.log(localStorage.getItem('words'));
          localStorage.setItem('email', email);
        }

        Api.getLocation().then(result => {
          if (existingEntry) {
              console.log("if existingEntry: "+existingEntry)
            // const prevWord = localStorage.getItem('word');
            const prevEmail = localStorage.getItem('email');
            const prevIp = localStorage.getItem('clientIp');
            if (prevIp !== result.ip ||
              !localStorage.getItem('words').includes(word) ||
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
            console.log("setLocalStorage(result)")
            setLocalStorage(result);
        }
      });

      Api.othersFor(props.selectedWord).then(response => {
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
