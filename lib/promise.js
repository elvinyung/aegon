'use strict';

var states = {
  'PENDING': 0,
  'FULFILLED': 1,
  'REJECTED': 2
};

function Promise() {
  this.fulfills = [];
  this.rejects = [];
  this.state = 'pending';
}

Promise.prototype.then = function then(onFulfilled, onRejected) {
  this.fulfills.push(onFulfilled);
  this.rejects.push(onRejected);
  return this;
};

Promise.prototype.resolve = function resolve(value) {
  if (value === this) {
    this.reject(new TypeError());
  }
  else if (value instanceof Promise) {
    this.state = value.state;
  }
  else {
    var callback = this.fulfills.shift();
    callback && callback(value);
  }
};

Promise.prototype.reject = function reject(reason) {
  var callback = this.rejects.shift();
  callback && callback(reason);
};

module.exports = Promise;
