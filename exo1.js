const express = require('express');
const app = express();

app.get('/ping', (req, res) => {
  res.type('text/plain').send('pong');
});

app.listen(3000, () => {
  console.log('Serveur en écoute sur http://localhost:3000');
});
