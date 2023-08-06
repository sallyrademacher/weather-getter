import express from 'express';
import twilio from 'twilio';
import 'getWeather.js';

const { MessagingResponse } = twilio.twiml;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));



app.post('/', async function(req, res){
    try {

        const twiml = new MessagingResponse();

        let weatherData = await getWeatherData(getTimelineURL, getTimelineParameters)
.then(data => {

            twiml.message(`It is ${data} degrees out.`)
            res.type('text/xml').send(twiml.toString());
        })

        

    }catch(error){
        console.log("error")
    }
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});