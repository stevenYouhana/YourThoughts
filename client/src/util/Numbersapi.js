const Numbersapi = {
  fact: () => {
    const date = new Date();
    const DAY_MONTH = [date.getDate(), date.getMonth()+1];
    return fetch(`http://numbersapi.com/${DAY_MONTH[1]}/${DAY_MONTH[0]}/date`)
      .then(response => response.text());
  },
  getQuote: async () => {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();    
    return data;
  }
}

export default Numbersapi;
