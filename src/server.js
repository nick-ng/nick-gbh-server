const express = require('express');
const uws = require('uws');
const path = require('path');
const bodyParser = require('body-parser');

const { makeNewCoachId, makeNewGame, checkId } = require('./services/game-service');

const PORT = process.env.PORT || 4000;
const INDEX = path.join(__dirname, 'public', 'index.html');

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.set('content-type', 'application/json; charset=utf-8');
  next();
});

server.post('/getId', (req, res) => res.json({ coachId: makeNewCoachId() }));

server.post('/newgame', (req, res) => makeNewGame(req.body.coachId)
                                        .then(({ gameId, coachId }) => res.json({ gameId, coachId })));

server.post('/checkid', (req, res) => checkId(req.body.coachId)
                                        .then(coachId => res.json({ coachId })));

server.use((req, res) => res.sendFile(INDEX));
server.listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new uws.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    console.log('client', client);
    client.send(new Date().toTimeString());
  });
}, 10000);
