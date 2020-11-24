const fs = require('fs');
const path = require('path');

/** 深度优先删除文件夹 */
function removeDir(dir, removeRoot = false) {
  fs.readdir(dir, function (err, files) {
    if(!files) return
    next(0);
    function next(index) {
      if (index === files.length) {
        removeRoot && fs.rmdir(dir, function (err) {
          if(!err) {
            console.error(err)
          }
        });
        return
      }
      let newPath = path.join(dir, files[index]);
      fs.stat(newPath, function (err, stat) {
        if (!err) {
          console.error(err);
          return
        }
        if (stat.isDirectory()) {
          removeDir(newPath, () => next(index + 1));
        } else {
          fs.unlink(newPath, function (err) {
            if (err) {
              console.error(err);
            }
            next(index + 1);
          });
        }
      })
    }
  })
}

/**
 * copyFolder
 */

function copyDir(sourceDir, targetDir) {
  // child_process.spawn('cp', ['-r', sourceDir, targetDir])
  if(!fs.existsSync(targetDir)) {
    mkDir(targetDir)
  }
  if(!fs.existsSync(sourceDir)) {
    return 
  }

  const files = fs.readdirSync(sourceDir, { withFileTypes: true });

  for(let i = 0; i< files.length; i++) {
    const file = files[i];
    const sFile = path.join(sourceDir, file.name);
    const tFile = path.join(targetDir, file.name);
    if(file.isFile()) {
      fs.createReadStream(sFile).pipe(fs.createWriteStream(tFile))
    } else {
      try {
        fs.accessSync(path.join(targetDir, '..'), fs.constants.W_OK);
        copyDir(sFile, tFile)
      } catch(err) {
        console.error('not has access' + path.join(targetDir, '..') + `: ${err}`)
      }
    }
  }
}

function mkDir(dirPath) {
  if(!fs.existsSync(dirPath)) {
    fs.mkdir(dirPath, (err, result) => {
      if(err) {
        console.error(err)
      }
    })
  };
}

removeDir(path.join(__dirname, './b'))

module.exports = {
  removeDir,
  mkDir,
  copyDir
}