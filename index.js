import express from 'express';
import path from 'path';
import {fileURLToPath } from 'url';
import bodyParser from 'body-parser';

import * as getWeatherModule from './getWeather.js';

import twilio from 'twilio';


const { MessagingResponse } = twilio.twiml;

const app = express();
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
//set up essential routes
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));

});

app.use(bodyParser.urlencoded({ extended: false }));



app.post('/', async function(req, res){
    try {

        const twiml = new MessagingResponse();

        let weatherData = await getWeatherModule.getWeatherData(getTimelineURL, getTimelineParameters)
.then(data => {

            twiml.message(`It is ${data} degrees out.`)
            res.type('text/xml').send(twiml.toString());
        }).catch(error => {
            console.log("trouble!")
        })

        

    }catch(error){
        console.log("error")
    }
});

//add router
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');