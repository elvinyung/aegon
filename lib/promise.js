'use strict';

var states = {
  'PENDING': 0,
  'FULFILLED': 1,
  'REJECTED': 2
};

function Promise() {
  this.onFulfilled = function() {};
  this.onRejected = function() {};
  this.state = states.PENDING;
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
    
    // append fulfill callback of value
    var vOnFulfilled = value.onFulfilled;
    value.onFulfilled = function (value) {
      vOnFulfilled();
      this.resolve(value);
    }

    // append reject callback of value
    var vOnRejected = value.onRejected;
    value.onRejected = function (reason) {
      vOnRejected();
      this.reject(reason);
    }
  }
  else {
    this.state = states.FULFILLED;
    this.onFulfilled && this.onFulfilled(value);
  }
};

Promise.prototype.reject = function reject(reason) {
  this.state = states.REJECTED;
  this.onRejected && this.onRejected(reason);
};

module && module.exports = Promise;
