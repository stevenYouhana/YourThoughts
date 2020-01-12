const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const apiRoutes = require('./backend/routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'client/build')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
  });
}
app.get('/', (req, res) => {
  console.log("app.get('/', (req, res)");
  res.send("app.get('/'")
});

app.get('/hey', (req, res) => res.send('ho!'));

apiRoutes(app);

app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});
