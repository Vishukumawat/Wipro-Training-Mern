
// question 8 

// Asynchronous JavaScript (Callbacks → Promise → Async/Await) 
// OLD CALLBACK VERSION
function fetchDataCallback(cb) {
  setTimeout(() => {
    cb(null, { id: 1, name: "Node.js" });
  }, 1000);
}

// PROMISE VERSION
function fetchDataPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: "Node.js" });
    }, 1000);
  });
}

// ASYNC AWAIT VERSION
async function fetchDataAsync() {
  const data = await fetchDataPromise();
  console.log("Async/Await:", data);
}

// Outputs
fetchDataCallback((_, data) => console.log("Callback:", data));
fetchDataPromise().then((d) => console.log("Promise:", d));
fetchDataAsync();
