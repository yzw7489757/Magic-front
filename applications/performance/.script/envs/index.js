'use strict';

const fs = require('fs');
const path = require('path');

const dotenvFiles = [
  path.resolve(__dirname, './.env'),
]

const resolveConfig = (env) => require(`./${env}.env.js`);

function injectEnvVariable(envFiles) {
  envFiles.forEach(envFile => {
    if (fs.existsSync(envFile)) {
      require('dotenv-expand')(
        require('dotenv').config({
          path: envFile,
        })
      );
    }
  });
}

const REACT_APP = /^APP_/i;
function getClientEnvironment(publicUrl, mode) {
  
  injectEnvVariable(
    [...dotenvFiles]
  );

  const envConfig = resolveConfig(mode)
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PUBLIC_URL: publicUrl,
        ...envConfig
      }
    );
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
