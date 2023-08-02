import fetch from 'node-fetch';
import queryString from 'query-string';
import moment from 'moment';


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

fetch(getTimelineURL + "?" + getTimelineParameters, {method: "GET", compress: true})
  .then((result) => result.json())
  .then(function(json) {
    let data = json.data.timelines[0].intervals[0].values
    let currentTemp = data.temperature
    let precip = data.precipitationType
    console.log(currentTemp)
    })
  .catch((error) => console.error("error: " + err));
