const messages = {
  welcome: () => ({ type: 'identify', message: 'Welcome. Please send the game id you are connecting to.' }),
};

const messagesJSON = Object.keys(messages)
  .reduce((o, key) => Object.assign({}, o, {
    [`${key}JSON`]: (...args) => JSON.stringify(messages[key](...args)),
  }), {});

module.exports = {
  messages,
  messagesJSON,
};
