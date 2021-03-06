// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import {enableProdMode} from '@angular/core';

import * as express from 'express';
import {join} from 'path';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 8080;
const DIST_FOLDER = join(process.cwd(), '/');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack

// Fix this, there are a bug in ng-chips
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main.bundle');


app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));


// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// Fix this, there are a bug in ng-chips
app.get('/', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), {req});
  console.log('render index');
});


app.get('*', (req, res) => {
  res.sendFile(join(DIST_FOLDER, 'browser', 'index.html'));
  console.log('render all another pages');
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
