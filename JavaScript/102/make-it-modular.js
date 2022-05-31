const sortFilesAndFilterByExt = require('./mymodule');

const dirPath = process.argv[2];
const fileExtention = process.argv[3];
sortFilesAndFilterByExt(dirPath, fileExtention, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((file) => {
    console.log(file);
  });
});
