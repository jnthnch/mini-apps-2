const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/bitcoin', (req, res) => {
  axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));