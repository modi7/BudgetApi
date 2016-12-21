var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'BudgetApi',
  description: 'Api Odata avec SQLITE',
  script: 'C:\\node\\odata_sqlite\\'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
/*
svc.on('install',function(){
	console.log('start service');
  svc.start();
});
	console.log('Install service');
svc.install();
*/

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});

// Uninstall the service.
svc.uninstall();
