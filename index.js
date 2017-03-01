const express = require('express');
const uws = require('uws');
const path = require('path');

const PORT = process.env.PORT || 4000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new uws.Server({ server });
console.log('wss', wss);

wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log('ws', ws);
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    console.log('client', client);
    client.send(new Date().toTimeString());
  });
}, 10000);
