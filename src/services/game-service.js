const uuidV4 = require('uuid/v4');
const config = require('../config');

const makeNewCoachId = (redisPromise) => {
  const coachId = uuidV4();
  console.log('new coachId', coachId);
  redisPromise('sadd', [config.redis.coachList, coachId]);
  return coachId;
};

module.exports = redisPromise => ({
  makeNewGame: (coachId) => {
    console.log(`Making new game for ${coachId}`);
    return {
      coachId: coachId || 'hello-world',
      gameId: 23,
    };
  },
  checkId: (coachId) => {
    if (coachId) {
      return redisPromise('sismember', [config.redis.coachList, coachId])
      .then((coachExists) => {
        if (coachExists) {
          return { coachId };
        }
        return { coachId: makeNewCoachId(redisPromise) };
      });
    }
    return { coachId: makeNewCoachId(redisPromise) };
  },
});
