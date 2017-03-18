const uuidV4 = require('uuid/v4');
const config = require('../config');

const makeNewCoachId = (redisClient) => {
  const coachId = uuidV4();
  redisClient.sadd([config.redis.coachList, coachId]);
  return coachId;
};

module.exports = makeRedisClient => ({
  makeNewGame: (coachId) => {
    console.log(`Making new game for ${coachId}`);
    return {
      coachId: coachId || 'hello-world',
      gameId: 23,
    };
  },
  checkId: (coachId) => {
    const redis = makeRedisClient();
    return redis.sismemberAsync(config.redis.coachList, [coachId || ''])
    .then((coachExists) => {
      if (coachExists) {
        return { coachId };
      }
      return { coachId: makeNewCoachId(redis) };
    })
    .then((r) => {
      redis.quit();
      return r;
    });
  },
});
