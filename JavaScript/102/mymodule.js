const fs = require('fs');

module.exports = function sortFilesAndFilterByExt(dirPath, fileExtention, callback) {
  fs.readdir(dirPath, (err, list) => {
    if (err) {
      callback(err);
      return;
    }
    const filtered = list.filter((fileName) => {
      const regex = `.${fileExtention}$`;
      return fileName.match(regex);
    });

    callback(null, filtered.sort());
  });
};
