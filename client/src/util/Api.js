
const Api = {
  getLocation: () => {
    return fetch('https://ipapi.co/json/').then(response => {
      return response.json();
    })
  },
  othersFor: (word) => {
    return fetch(`/others/${word}`).then(response => {
      return response.json();
    })
  },
  newRecord: (data) => {
    fetch('/new', {
     method: 'post',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({
      email: data.email,
      word: data.word,
      thought: data.thought,
      region: data.region,
      lon: data.lon,
      lat: data.lat
     })
   }).catch(err => console.error(err));
  },
  getWordsForTheWeek: () => {
    console.log("getWordsForTheWeek: () =>")
    return fetch('/words').then(response => {      
      return response;
    });
  },
  others: (word) => {
    return fetch(`/others/test`).then(response => response.json());
  }
}
export default Api;
