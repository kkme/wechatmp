let nullFn = () => {};
const Promise = require('es6-promise.js');

function IllegalAPIException(name) {
  this.message = 'No Such API [' + name + ']';
  this.name = 'IllegalAPIException';
}
let services = {
  sleep: (time) => {
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, time);
    });
  },
  stop: () => {
    return new Promise(function(resolve, reject) {});
  },
  tasks: () => {
    return new Promise(function(resolve, reject) {
      resolve();
    });
  }
};
export default new Proxy(services, {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    } else if (property in wx) {
      return (obj) => {
        return new Promise((resolve, reject) => {
          obj = obj || {};
          obj.success = (...args) => {
            resolve(...args);
          };
          obj.fail = (...args) => {
            reject(...args);
          };
          obj.complete = nullFn;
          wx[property](obj);
        });
      };
    } else {
      throw new IllegalAPIException(property);
    }

  }
});
