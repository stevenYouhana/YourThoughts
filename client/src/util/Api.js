
const Api = {
  othersFor: (word) => {
    return fetch(`/others/${word}`).then(response => {
      console.log("fetch(`/others/${word}`).then(response =>, ", response);
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
      lon: data.lon,
      lat: data.lat
     })
   }).then(data => {
     console.log(data);
   })
    .catch(err => console.error(err));
  },
  others: (word) => {
    return fetch(`/others/test`).then(response => response.json());
  }
}
export default Api;
