const http = require('http');
const bl = require('bl');

const urls = process.argv.slice(2);
const responseQueue = [];


urls.forEach((url, index) => {
  responseQueue.push({
    data: '',
    isRecived: false,
    isComplete: false
  });

  http.get(url, (response) => {
    response.pipe(
      bl((err, data) => {
        if (err) {
          return console.error(err);
        }

        responseQueue[index].data = data.toString();
        responseQueue[index].isRecived = true;

        for(let i = 0; i < responseQueue.length; i++) {
          if (!responseQueue[i].isRecived) {
            return;
          }

          if(!responseQueue[i].isComplete) {
            console.log(responseQueue[i].data);
            responseQueue[i].isComplete = true;
          }
    
        }
      })
    );
  });
});
