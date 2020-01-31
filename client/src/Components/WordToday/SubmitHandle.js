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

        const setLocalStorage = (data) => {
          localStorage.removeItem('clientIp');
          localStorage.removeItem('email');
          localStorage.setItem('clientIp', data.ip);
          localStorage.setItem('email', email);

          if (localStorage.getItem('words')) {
              localStorage.setItem('words', [localStorage.getItem('words'), word]);
          }
          else localStorage.setItem('words', [word]);
        }

        const prevEmail = localStorage.getItem('email');
        if (!localStorage.getItem('words') || localStorage.getItem('words') === '') {
            localStorage.setItem('email', email);
            localStorage.setItem('words', [word]);
            Api.newRecord({
              email: email,
              word: word,
              thought: thought,
              region: props.location,
            });
        }
        else {
          if (prevEmail === email && localStorage.getItem('words').includes(word))
            return alert.show("Thanks! you have already submitted your thought");

          if (prevEmail !== email) {
            localStorage.setItem('email', email);
            localStorage.setItem('words', [word]);
          }
          else {
            if (!localStorage.getItem('words').includes(word)) {
              localStorage.setItem('words', [localStorage.getItem('words'), word])
            }
          }
          Api.newRecord({
            email: email,
            word: word,
            thought: thought,
            region: props.location,
          });

        }
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
