const fs = require('fs');
const dirPath = process.argv[2];
const fileExtention = process.argv[3];

fs.readdir(dirPath, (err, list) => {
  if (err) {
    console.error(err);
    return;
  }
  const filtered = list.filter((fileName) => {
    const regex = `.${fileExtention}$`;
    return fileName.match(regex);
  });

  filtered.sort().forEach((file) => {
    console.log(file);
  });
});
