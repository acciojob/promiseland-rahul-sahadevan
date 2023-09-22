// complete the js code
class CustomPromise {
  constructor() {
    this.state = 'pending'; // Initial state
    this.value = undefined; // Resolved value
    this.reason = undefined; // Rejection reason
    this.fulfillmentHandlers = []; // Array to store fulfillment handlers
    this.rejectionHandlers = []; // Array to store rejection handlers
    this.finallyHandlers = []; // Array to store finally handlers
  }

  // Method to resolve the promise with a value
  resolve(value) {
    if (this.state === 'pending') {
      this.state = 'fulfilled';
      this.value = value;
      this._executeHandlers(this.fulfillmentHandlers, this.value);
      this._executeHandlers(this.finallyHandlers);
    }
  }

  // Method to reject the promise with a reason
  reject(reason) {
    if (this.state === 'pending') {
      this.state = 'rejected';
      this.reason = reason;
      this._executeHandlers(this.rejectionHandlers, this.reason);
      this._executeHandlers(this.finallyHandlers);
    }
  }

  // Method to add fulfillment and rejection handlers
  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value);
    } else if (this.state === 'rejected') {
      onRejected(this.reason);
    } else {
      this.fulfillmentHandlers.push(onFulfilled);
      this.rejectionHandlers.push(onRejected);
    }
    return this;
  }

  // Method to add a rejection handler (shorthand for then(null, onRejected))
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // Method to add a handler that runs when the promise is settled
  finally(onFinally) {
    if (this.state !== 'pending') {
      onFinally();
    } else {
      this.finallyHandlers.push(onFinally);
    }
    return this;
  }

  // Internal method to execute handlers
  _executeHandlers(handlers, arg) {
    handlers.forEach(handler => {
      if (typeof handler === 'function') {
        handler(arg);
      }
    });
  }
}

// Example usage:
const promise = new CustomPromise((resolve, reject) => {
  // Simulate an asynchronous operation
  setTimeout(() => {
    resolve('Success');
    // or reject('Error');
  }, 1000);
});

promise
  .then(result => {
    console.log('Fulfilled:', result);
  })
  .catch(error => {
    console.error('Rejected:', error);
  })
  .finally(() => {
    console.log('Finally');
  });

window.CustomPromise = CustomPromise;
