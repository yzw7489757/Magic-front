const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;
const currentPath = path.resolve(__dirname);
const appPath = currentPath + '/applications'

// const WEB_PATH = path.resolve(__dirname, 'magic-front') //应用路径
const WEB_PATH = '/data/www/magic-front/' //应用路径

const mainApp = 'main'

const appDirs = fs.readdirSync(appPath, 'utf8').filter(appDir => appDir !== mainApp)

console.log(`
  This time there is a total of ${appDirs.length} project: \n  ${appDirs.join('\n  ')}
`)
deployMain()
deploySubApp()

function deployMain() {
  // 部署主应用
  cleanDirSubFile(WEB_PATH)
  cpDir(`${appPath}/${mainApp}/dist`, WEB_PATH)
  // rmDir(`${appPath}/${mainApp}/dist`)
}

function deploySubApp() {
  const queue = appDirs.map((subPath) => deployApp(subPath))
  if(queue.length === 0) exec(`echo no Task Running`) 
  mkDir(WEB_PATH)
  const res = invokeTask(queue)
}
function invokeTask(queue){
  if(queue.length === 0) return 'Task completed'
  const task = queue.pop()

  task().then(async ()=> {
    await exec(`echo task invoke succesed`)
    await invokeTask(queue)
  }, (err) => {
    throw err
  })
}

function deployApp(appName) {
  return () => new Promise((resolve, reject) => {
    const package = require(`${appPath}/${appName}/package.json`);
    exec(`echo ${package.name} deploying...`)

    try {
      const appDir = fs.readdirSync(appPath + '/' + appName, 'utf8')
      // 删掉原有目录
      rmDir(`${WEB_PATH}/${appName}`)

      if (~appDir.indexOf('dist')) {
        cpDir(`${appPath}/${appName}/dist`,`${WEB_PATH}/${appName}`)
        // rmDir(`${appPath}/${appName}/dist`)
      } else {
        cpDir(`${appPath}/${appName}/build`,`${WEB_PATH}/${appName}`)
        // rmDir(`${appPath}/${appName}/build`)
      }
      resolve()
    } catch (e) {
      reject(e)
    }

    exec(`echo ${package.name} deploy done`)
  })
}

function rmDir(path){
  exec('rm -rf '+ path)
}

function mkDir(path){
  exec(`if [ ! -d '${path}' ]; then mkdir '${path}'; fi`);
}

function cpDir(fromPath,toPath) {
  mkDir(toPath)
  exec(`cp -r ${fromPath}/* ${toPath}`)
}

/**
 * 清空子文件，不清空文件夹
 * @param {string} [path]
 */
function cleanDirSubFile(path) {
  exec(`find ${path} -maxdepth 1 -type f | xargs rm -f`)
}