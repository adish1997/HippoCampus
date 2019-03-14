const routes = require('next-routes')();

routes
.add('/patient/new', '/patient/new')
.add('/patient/:address', '/patient/show')
.add('/patient/:address/reports', '/patient/reports/show')
.add('/patient/:address/reports/new', '/patient/reports/new');


module.exports = routes;
