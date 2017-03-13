const badNumbers = [
  '69',
  '666',
  '6969',
  '80085',
];

const funcs = {
  randomString: (strLength, charSet = '0123456789') => {
    const result = [];
    while (result.length < (strLength || 5)) {
      result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
    }
    return result.join('');
  },
  generateNewKey: (keyList) => {
    let keyLength = keyList.reduce((m, key) => Math.max(m, key.length), 2);
    const usedList = keyList.concat(badNumbers);
    for (;;) {
      for (let i = 0; i < 10 ** keyLength; i += 1) {
        const newKey = funcs.randomString(keyLength).toLowerCase();
        if (!usedList.includes(newKey)) return newKey;
      }
      keyLength += 1;
    }
  },
};

module.exports = funcs;
