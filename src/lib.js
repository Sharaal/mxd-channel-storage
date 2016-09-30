const redis = require('redis');

module.exports = ({ client, url }) => {
  client = client || redis.createClient(url);
  const key = 'CHANNEL';
  return {
    add: async value => {
      return new Promise(resolve => {
        client.sadd(key, value, () => { resolve(); });
      });
    },
    values: async () => {
      return new Promise(resolve => {
        client.smembers(key, (err, values) => {
          resolve(values);
        });
      });
    },
    delete: async value => {
      return new Promise(resolve => {
        client.srem(key, value, () => { resolve(); });
      });
    }
  };
};
