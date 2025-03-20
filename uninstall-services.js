// uninstall-services.js
const Service = require('node-windows').Service;
const path = require('path');

// Uninstall HAIperNextApp
const svc1 = new Service({
  name: 'HAIperNextApp',
  script: path.join('D:\\Projects\\hAIper', 'service-wrapper.js')
});

svc1.on('uninstall', function() {
  console.log('HAIperNextApp service has been uninstalled.');
});

// Uninstall HAIperReactApp
const svc2 = new Service({
  name: 'HAIperReactApp',
  script: path.join('D:\\Projects\\hAIper', 'service-wrapper.js')
});

svc2.on('uninstall', function() {
  console.log('HAIperReactApp service has been uninstalled.');
});

// Uninstall both services
svc1.uninstall();
svc2.uninstall();