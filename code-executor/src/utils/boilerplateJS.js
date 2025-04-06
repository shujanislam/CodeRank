const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const boilerplateJS = (prob, code, params) => {
  const fileName = 'temp.js';

  // Path where temp.js will be created
  const tempDir = path.join(__dirname, 'temp');
  const filePath = path.join(tempDir, fileName);

  // Docker context and Dockerfile location
  const projectRoot = path.resolve(__dirname, '../..');
  const dockerJsDir = path.join(projectRoot, 'docker/js');
  const dockerTempJsPath = path.join(dockerJsDir, fileName);

  // Make sure temp dir exists
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Make sure docker/js exists
  if (!fs.existsSync(dockerJsDir)) {
    fs.mkdirSync(dockerJsDir, { recursive: true });
  }

  // Build the code to run
  const wholeCode = `
function execute(a, b) {
  ${code}
}
const result = execute(${params});
console.log('OUTPUT:', result);
console.log('Hello from Docker!');
`;

  // Write temp.js
  fs.writeFileSync(filePath, wholeCode);

  // Copy to docker context
  fs.copyFileSync(filePath, dockerTempJsPath);

  // Spawn Docker build and run separately
  const build = spawn('docker', ['build', '-t', 'js-runner', '.'], { cwd: dockerJsDir });
  build.stdout.on('data', data => process.stdout.write(`🛠️ build: ${data}`));
  build.stderr.on('data', data => process.stderr.write(`❌ build error: ${data}`));

  build.on('close', (code) => {
    if (code !== 0) {
      console.error(`Build failed with code ${code}`);
      return;
    }

    // Run the container after successful build
    const run = spawn('docker', ['run', '--rm', 'js-runner']);
    run.stdout.on('data', data => process.stdout.write(`📦 run output: ${data}`));
    run.stderr.on('data', data => process.stderr.write(`❌ run error: ${data}`));
    run.on('close', code => console.log(`✅ Run completed with code ${code}`));
  });
};

module.exports = { boilerplateJS };
