import express from 'express';
import path from 'path';
import {fileURLToPath } from 'url';

const app = express();
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
//set up essential routes
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));

});

//add router
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');