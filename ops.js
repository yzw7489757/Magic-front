const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;

const currentPath = path.resolve(__dirname);
const appPath = `${currentPath}/applications`;

// const WEB_PATH = '/Users/floyd_yzw/Documents'; // 应用路径
const WEB_PATH = '/data/www/magic-front'; // 应用路径
const mainApp = 'main';

const appDirs = fs.readdirSync(appPath, 'utf8').filter(appDir => appDir !== mainApp);

console.log(`
  This time there is a total of ${appDirs.length} project: \n  ${appDirs.join('\n  ')}
`);

deployMain();
deploySubApp();

function deployMain() {
  const main_ops_path = `${WEB_PATH}/${mainApp}`
  // 部署主应用
  mkDir(main_ops_path)
  cleanSubFile(main_ops_path);
  cpDir(`${appPath}/${mainApp}/dist`, main_ops_path);
  rmDir(`${appPath}/${mainApp}/dist`);
}

function deploySubApp() {
  const queue = appDirs.map(deployApp);
  if (queue.length === 0) return exec('echo no Task Running');
  invokeTask(queue);
}

function invokeTask(queue) {
  if (queue.length === 0) return exec('echo Task completed');
  const task = queue.pop();

  task().then(async () => {
    await exec('echo task invoke succesed');
    await invokeTask(queue);
  }, err => {
    throw err;
  });
}

function deployApp(appName) {
  return () => new Promise((resolve, reject) => {
    const { name } = require(`${appPath}/${appName}/package.json`);
    console.log(`${name} deploying...`)

    try {
      const appDir = fs.readdirSync(`${appPath}/${appName}`, 'utf8');
      // 删掉原有目录
      rmDir(`${WEB_PATH}/${appName}`);

      if (~appDir.indexOf('dist')) {
        cpDir(`${appPath}/${appName}/dist`, `${WEB_PATH}/${appName}`);
        rmDir(`${appPath}/${appName}/dist`);
      } else {
        cpDir(`${appPath}/${appName}/build`, `${WEB_PATH}/${appName}`);
        rmDir(`${appPath}/${appName}/build`);
      }
      resolve();
    } catch (e) {
      reject(e);
    }
    console.log(`${name} deploy done`)
  });
}

function rmDir(dirPath) {
  exec(`rm -rf ${dirPath}`);
}

function mkDir(dirPath) {
  exec(`if [ ! -d '${dirPath}' ]; then mkdir '${dirPath}'; fi`);
}

function cpDir(fromPath, toPath) {
  mkDir(toPath);
  exec(`cp -r ${fromPath}/* ${toPath}`);
}

/**
 * 清空子文件，exclude 文件夹
 * @param {string} [path]
 */
function cleanSubFile(dirPath) {
  exec(`find ${dirPath} -maxdepth 1 -type f | xargs rm -f`);
}
