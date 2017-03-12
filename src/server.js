const express = require('express');
const uws = require('uws');
const path = require('path');
const bodyParser = require('body-parser');

const { redisPromise } = require('./services/redis-service');
const gameServices = require('./services/game-service');

const { makeNewGame, checkId } = gameServices(redisPromise);

const PORT = process.env.PORT || 4000;
const INDEX = path.join(__dirname, 'public', 'index.html');

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.post('/newgame', makeNewGame);
server.post('/checkid', (req, res) => res.json(checkId(req.body.coachId)));
server.use((req, res) => res.sendFile(INDEX));
server.listen(PORT, () => console.log(`Listening on ${PORT}`));

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
