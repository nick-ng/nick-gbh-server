const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_URL);
redisClient.on('error', err => console.log('Error', err));

module.exports = {
  redisClient,
  redisPromise: (redisCommand, redisArgs) => new Promise(resolve => redisClient[redisCommand](redisArgs, resolve)),
};
