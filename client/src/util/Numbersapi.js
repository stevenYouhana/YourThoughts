const Numbersapi = {
  fact: () => {
    const date = new Date();
    const DAY_MONTH = [date.getDate(), date.getMonth()+1];
    return fetch(`http://numbersapi.com/${DAY_MONTH[1]}/${DAY_MONTH[0]}/date`)
      .then(response => response.text());
  }
}

export default Numbersapi;
