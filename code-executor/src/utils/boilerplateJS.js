const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const { executor } = require('./executor.js');

const boilerplateJS = (prob, code, params) => {
  const fileName = 'temp.js';

  // Paths
  const tempDir = path.join(__dirname, 'temp');
  const filePath = path.join(tempDir, fileName);

  const projectRoot = path.resolve(__dirname, '../..');
  const dockerJsDir = path.join(projectRoot, 'docker/js');
  const dockerTempJsPath = path.join(dockerJsDir, fileName);

  // Ensure folders exist
  fs.mkdirSync(tempDir, { recursive: true });
  fs.mkdirSync(dockerJsDir, { recursive: true });

  // JS code to run
  const wholeCode = `
    ${code}
    const result = execute(${params[0]}, ${params[1]});
    const expected = ${params[2]};
    if (result === expected) {
      console.log('✅ Passed');
    } else {
      console.log('Failed: got', result, 'but expected', expected);
    }
  `;

  fs.writeFileSync(filePath, wholeCode);
  fs.copyFileSync(filePath, dockerTempJsPath);

  executor(code, dockerJsDir);
};

module.exports = { boilerplateJS };
