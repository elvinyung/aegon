'use strict';

var states = {
  'PENDING': 0,
  'FULFILLED': 1,
  'REJECTED': 2
};

function Promise() {
  this.onFulfilled = function() {};
  this.onRejected = function() {};
  this.state = 'pending';
}

Promise.prototype.then = function then(onFulfilled, onRejected) {
  this.onFulfilled = onFulfilled || this.onFulfilled;
  this.onRejected = onRejected || this.onRejected;
  return new Promise();
};

Promise.prototype.resolve = function resolve(value) {
  if (value === this) {
    this.reject(new TypeError());
  }
  else if (value instanceof Promise) {
    this.state = value.state;
  }
  else {
    this.onFulfilled && this.onFulfilled(value);
  }
};

Promise.prototype.reject = function reject(reason) {
  this.onRejected && this.onRejected(reason);
};

module.exports = Promise;
