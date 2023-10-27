function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    console.log("true");
    const promise = new Promise((resolve, reject) => {
      resolve("+");
    })
    console.log(promise);
    return promise.then(value)
  } else {
    // Reject
    console.log('false');
    const promise = new Promise((resolve, reject) => {
      reject('-');
    });
    console.log(promise);
  }
}

console.log(createPromise());