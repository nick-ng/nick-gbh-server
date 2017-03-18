const redis = require('redis');
const bluebird = require('bluebird');

const makeRedisClient = () => {
  redis.createClient(process.env.REDIS_URL);
  bluebird.promisifyAll(redis.RedisClient.prototype);
  bluebird.promisifyAll(redis.Multi.prototype);
  return redis.createClient();
};

module.exports = {
  makeRedisClient,
};
