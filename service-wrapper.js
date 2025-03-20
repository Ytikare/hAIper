// Updated service-wrapper.js
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Working directory
const workingDir = 'D:\\Projects\\hAIper';

// Log function with timestamp
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  
  // Also write to a log file for troubleshooting
  fs.appendFileSync(path.join(workingDir, 'service-log.txt'), logMessage + '\n');
}

// Execute a command and return a promise
function execCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    log(`Executing: ${command}`);
    exec(command, { ...options, cwd: workingDir }, (error, stdout, stderr) => {
      if (error) {
        log(`Error: ${error.message}`);
        log(`stderr: ${stderr}`);
        reject(error);
        return;
      }
      log(`stdout: ${stdout}`);
      resolve(stdout);
    });
  });
}

// Kill any process running on port 7777 or 8000 - useful to clear stuck ports
async function killProcessOnPort(port) {
  try {
    log(`Checking for processes on port ${port}...`);
    const result = await execCommand(`netstat -ano | findstr :${port}`);
    if (result) {
      const lines = result.split('\n');
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length > 4) {
          const pid = parts[4];
          if (pid && !isNaN(parseInt(pid))) {
            log(`Killing process PID ${pid} on port ${port}`);
            await execCommand(`taskkill /F /PID ${pid}`);
          }
        }
      }
    }
  } catch (error) {
    log(`No processes found on port ${port} or error: ${error.message}`);
  }
}

// Main process
async function main() {
  try {
    // Kill any processes using our ports
    await killProcessOnPort(7777);
    
    // Install dependencies
    log('Installing dependencies...');
    await execCommand('npm install');

    // Build the app
    log('Building the app...');
    await execCommand('npm run build');

    // Delete any existing web.config to avoid conflicts
    const webConfigPath = path.join(workingDir, 'web.config');
    if (fs.existsSync(webConfigPath)) {
      log('Removing existing web.config...');
      fs.unlinkSync(webConfigPath);
    }

    // Start the Next.js app with explicit host binding to all interfaces
    log('Starting the app with explicit host and port...');
    const startProcess = exec('npm start -- -H 0.0.0.0 -p 7777', { 
      cwd: workingDir,
      detached: false 
    });

    // Log process output
    startProcess.stdout.on('data', (data) => {
      log(`App output: ${data}`);
    });

    startProcess.stderr.on('data', (data) => {
      log(`App error: ${data}`);
    });

    startProcess.on('close', (code) => {
      log(`App process exited with code ${code}`);
      // Restart the app if it crashes
      setTimeout(main, 10000);
    });
  } catch (error) {
    log(`An error occurred: ${error.message}`);
    // Wait for 30 seconds before restarting in case of error
    setTimeout(main, 30000);
  }
}

// Start the main process
main();