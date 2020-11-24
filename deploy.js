const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;

const { webPath: proWebPath, stageWebPath } = require('./appConfig');
const { removeDir, copyDir } = require('./utils');

const appPath = path.resolve(__dirname, './applications');
const appDirs = fs.readdirSync(appPath, 'utf8')

function print(msg) {
  exec(`echo ${msg}`)
}

print(`
  This time there is a total of ${appDirs.length} project: \n  ${appDirs.join('\n  ')}
`);

// 提取参数
const extractReg = /^([a-zA-Z]+)[\=]?([a-zA-Z]+)?/;
const args = process.argv.filter(Boolean).filter(d => extractReg.test(d));
const cmdParams = args.reduce((params, expr) => {
  extractReg.lastIndex = 0;
  const result = extractReg.exec(expr);
  if(!result) return params;
  return {
    ...params,
    [result[1]]: result[2] || true 
  }
}, {})

const webPath = cmdParams.mode === 'pro' ? proWebPath : stageWebPath;

deployMain();
deploySubApp();

function deployMain() {
  // 部署主应用
  const main_ops_path = `${webPath}/entry`
  const main_app_path = path.resolve(__dirname, `./entry/dist`)
  removeDir(main_ops_path);
  copyDir(main_app_path, main_ops_path);
  removeDir(main_app_path);
}

function deploySubApp() {
  const queue = appDirs.map(deployApp);
  if (queue.length === 0) return print('no Task Running');
  invokeTask(queue);
}

function invokeTask(queue) {
  if (queue.length === 0) return print('Task completed');
  const task = queue.pop();

  task().then(async () => {
    print('task invoke succesed');
    invokeTask(queue);
  }, err => {
    throw err;
  });
}

function deployApp(appName) {
  return () => new Promise((resolve, reject) => {
    const { name } = require(`${appPath}/${appName}/package.json`);
    print(`${name} deploying...`)

    try {
      const appDir = fs.readdirSync(`${appPath}/${appName}`, 'utf8');
      // 删掉原有目录
      removeDir(`${webPath}/${appName}`);

      if (~appDir.indexOf('dist')) {
        copyDir(`${appPath}/${appName}/dist`, `${webPath}/${appName}`);
        removeDir(`${appPath}/${appName}/dist`);
      } else {
        copyDir(`${appPath}/${appName}/build`, `${webPath}/${appName}`);
        removeDir(`${appPath}/${appName}/build`);
      }
      resolve();
    } catch (e) {
      reject(e);
    }
    print(`${name} deploy done`)
  });
}