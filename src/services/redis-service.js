const redis = require('redis');
const bluebird = require('bluebird');

const makeRedisClient = () => {
  redis.createClient(process.env.REDIS_URL);
  bluebird.promisifyAll(redis.RedisClient.prototype);
  bluebird.promisifyAll(redis.Multi.prototype);
  return redis.createClient();
};

const autoScan = (pattern, cursor = 0, matches = [], client = makeRedisClient()) => client.scanAsync(cursor, 'MATCH', pattern)
  .then((result) => {
    const newCursor = +result[0];
    const allMatches = matches.concat(result[1]);
    console.log('allMatches', allMatches.sort());
    console.log('games', allMatches.length);
    if (newCursor === 0) {
      client.quit();
      return allMatches;
    }
    return autoScan(pattern, newCursor, allMatches, client);
  });

module.exports = {
  makeRedisClient,
  autoScan,
};
