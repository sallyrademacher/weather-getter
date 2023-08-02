import 'dotenv/config';
import twilio from 'twilio';

const accountSid = "ACbb34c3f41f7d330761d1143bdea610e3";
const authToken = "264901e9129ebef5484444d6225af406";
const client = twilio(accountSid, authToken);

client.messages
.create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: "+18668285812",
    to: "+17814057882"
    })
.then(message => console.log(message.sid));