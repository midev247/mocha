// This file is allowed to use async/await because it is not exposed to browsers (see the `eslintrc`),
// and Node supports async/await in all its non-dead version.

const url = require('url');
const path = require('path');

exports.requireOrImport = file => {
  try {
    file = path.resolve(file);
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
  for (const file of files) {
    preLoadFunc(file);
    const result = await exports.requireOrImport(file);
    postLoadFunc(file, result);
  }
};
