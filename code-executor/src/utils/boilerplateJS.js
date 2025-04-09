const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

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
function execute(a, b) {
  ${code}
}
const result = execute(${params});
console.log('OUTPUT:', result);
`;

  fs.writeFileSync(filePath, wholeCode);
  fs.copyFileSync(filePath, dockerTempJsPath);

  // Step 1: Docker Build
  const build = spawn('docker', ['build', '-t', 'js-runner', '.'], { cwd: dockerJsDir });

  build.stdout.on('data', (data) => {
    process.stdout.write(`🛠️ build: ${data}`);
  });

  build.stderr.on('data', (data) => {
    process.stderr.write(`❌ build error: ${data}`);
  });

  build.on('close', (code) => {
    if (code !== 0) {
      console.error(`⛔ Docker build failed with code ${code}`);
      return;
    }

    // Step 2: Docker Run
    const run = spawn('docker', ['run', '--rm', 'js-runner']);

    run.stdout.on('data', (data) => {
      process.stdout.write(`${data}`);
    });

    run.stderr.on('data', (data) => {
      process.stderr.write(``);
    });

    run.on('close', (code) => {
      console.log(`✅ Run completed with code ${code}`);
    });
  });
};

module.exports = { boilerplateJS };
