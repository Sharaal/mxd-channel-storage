'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const redis = require('redis');

module.exports = (_ref) => {
  let client = _ref.client;
  let url = _ref.url;

  client = client || redis.createClient(url);
  const key = 'CHANNEL';
  return {
    add: (() => {
      var _ref2 = _asyncToGenerator(function* (value) {
        return new Promise(function (resolve) {
          client.sadd(key, value, function () {
            resolve();
          });
        });
      });

      return function add(_x) {
        return _ref2.apply(this, arguments);
      };
    })(),
    values: (() => {
      var _ref3 = _asyncToGenerator(function* () {
        return new Promise(function (resolve) {
          client.smembers(key, function (err, values) {
            resolve(values);
          });
        });
      });

      return function values() {
        return _ref3.apply(this, arguments);
      };
    })(),
    delete: (() => {
      var _ref4 = _asyncToGenerator(function* (value) {
        return new Promise(function (resolve) {
          client.srem(key, value, function () {
            resolve();
          });
        });
      });

      return function _delete(_x2) {
        return _ref4.apply(this, arguments);
      };
    })()
  };
};