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
      console.log('coachList', config.redis.coachList);
      console.log('coachId', coachId);
      console.log('redisPromose', redisPromise);
      return redisPromise('sismember', [config.redis.coachList, coachId])
      .then((a, coachExists) => {
        console.log('a', a);
        console.log('coachExists', coachExists);
        if (coachExists) {
          return { coachId };
        }
        return { coachId: makeNewCoachId(redisPromise) };
      });
    }
    return { coachId: makeNewCoachId(redisPromise) };
  },
});
