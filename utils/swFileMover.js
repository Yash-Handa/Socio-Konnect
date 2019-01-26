const path = require('path');
const fs = require('fs');

fs.renameSync(path.join(__dirname, '../service-worker.js'), path.join(__dirname, '../public/src/service-worker.js'));
