import fetch from 'node-fetch';
import queryString from 'query-string';
import moment from 'moment';
import 'dotenv/config';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken)

// set the Timelines GET endpoint as the target URL
const getTimelineURL = "https://api.tomorrow.io/v4/timelines";

// get your key from app.tomorrow.io/development/keys
const apikey = process.env.TOMORROW_API_KEY;
const amherst = [42.373222, -72.519852];
// amherst, ma
let location = amherst;

const fields = [
    "precipitationIntensity",
    "precipitationType",
    "windSpeed",
    "windGust",
    "windDirection",
    "temperature",
    "temperatureApparent",
    "cloudCover",
    "cloudBase",
    "cloudCeiling",
    "weatherCode"
  ];

const units = "imperial";

const timesteps = ["current"]

const now = moment.utc();
const startTime = moment.utc(now).add(0, "minutes").toISOString();
const endTime = moment.utc(now).add(1, "days").toISOString();

const timezone = "America/New_York";

// request the timelines with all the query string parameters as options
const getTimelineParameters =  queryString.stringify({
    apikey,
    location,
    fields,
    units,
    timesteps,
    startTime,
    endTime,
    timezone,
}, {arrayFormat: "comma"});

async function getWeatherData(getTimelineURL, getTimelineParameters){
    let response = await fetch(getTimelineURL + "?" + getTimelineParameters, {method: "GET", compress: true})
    let result = await response.json();
    let data = await result.data.timelines[0].intervals[0].values
    let currentTemp = await data.temperature
    return currentTemp      
}

let weatherData = await getWeatherData(getTimelineURL, getTimelineParameters)
.then(data => {
    client.messages
    .create({
        body: `It is ${data} degrees.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.MY_PHONE_NUMBER

    }).then(message => console.log(message.sid))
})

//@TODO: send weather data on user request thru text

