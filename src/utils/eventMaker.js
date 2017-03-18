const events = {
  addCoach: (coachId, team) => ({
    type: 'addCoach',
    team,
    coachId,
  }),
};

const eventsJSON = Object.keys(events)
  .reduce((o, key) => Object.assign({}, o, {
    [`${key}JSON`]: (...args) => JSON.stringify(events[key](...args)),
  }), {});

module.exports = Object.assign({}, events, eventsJSON);
