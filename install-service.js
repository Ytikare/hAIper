// install-service.js - Updated configuration
const Service = require('node-windows').Service;
const path = require('path');

// Create a new service object with a consistent name
const svc = new Service({
  name: 'hAIper', // Using the name 'hAIper' consistently
  description: 'HAIper Next.js Application Service',
  script: path.join('D:\\Projects\\hAIper', 'service-wrapper.js'),
  nodeOptions: [],
  workingDirectory: 'D:\\Projects\\hAIper',
  // Allow the service to interact with the desktop
  allowServiceInteraction: true
});

// Listen for service install events
svc.on('install', function() {
  console.log('Service installed successfully!');
  svc.start();
});

svc.on('alreadyinstalled', function() {
  console.log('Service is already installed. Uninstalling...');
  svc.uninstall();
});

svc.on('uninstall', function() {
  console.log('Service uninstalled. Reinstalling...');
  svc.install();
});

svc.on('start', function() {
  console.log('Service started successfully!');
});

svc.on('error', function(err) {
  console.error('Service error:', err);
});

// Install the service
console.log('Installing service...');
svc.install();