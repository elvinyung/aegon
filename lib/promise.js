'use strict';

function Promise() {
  this.fulfills = [];
  this.rejects = [];
}

Promise.prototype.then = function then(onFulfilled, onRejected) {
  this.fulfills.push(onFulfilled);
  this.rejects.push(onRejected);
  return this;
};

Promise.prototype.resolve = function resolve(value) {
  var callback = this.fulfills.shift();
  callback && callback(value);
};

Promise.prototype.reject = function reject(reason) {
  var callback = this.rejects.shift();
  this.rejects.pop(0)(reason);
};

