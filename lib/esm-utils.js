const url = require('url');

exports.requireOrImport = file => {
  try {
    return require(file);
  } catch (err) {
    if (err.code === 'ERR_REQUIRE_ESM') {
      // returns a promise
      return import(url.pathToFileURL(file));
    } else {
      throw err;
    }
  }
};

exports.loadFilesAsync = async (files, preLoadFunc, postLoadFunc) => {
  let i = 0;
  for (const file of files) {
    preLoadFunc(file, i);
    const result = await exports.requireOrImport(file);
    postLoadFunc(file, result);
    ++i;
  }
};
