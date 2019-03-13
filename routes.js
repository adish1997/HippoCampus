const routes = require('next-routes')();

routes
.add('/patient/new', '/patient/new')
.add('/patient/:address', '/patient/show');


module.exports = routes;
