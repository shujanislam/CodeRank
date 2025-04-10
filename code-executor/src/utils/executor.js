const { spawn } = require('child_process');

const executor = (code, dockerJsDir) => {
  // Step 1: Docker Build
  const build = spawn('docker', ['build', '-t', 'js-runner', '.'], { cwd: dockerJsDir });

  build.stdout.on('data', (data) => {
    process.stdout.write(`build: ${data}`);
  });

  build.stderr.on('data', (data) => {
    process.stderr.write(`build error: ${data}`);
  });

  build.on('close', (code) => {
    if (code !== 0) {
      console.error(`Docker build failed with code ${code}`);
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
      console.log(`Run completed with code ${code}`);
    });
  });
}

module.exports = { executor };
