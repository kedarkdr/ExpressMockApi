// function to block / sleep the thread

function utilities() {
  sleep = milliseconds => {
    //console.log("from sleep");
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  async function runLoopwithDelay() {
    for (let i = 0; i < 1000; i++) {
      //console.log(i);
      // commenting below line will block node process to handle other http requests till the loop is finished
      await sleep(1).then(() => {});
    }
  }
  return { sleep, runLoopwithDelay };
}

module.exports = utilities();
