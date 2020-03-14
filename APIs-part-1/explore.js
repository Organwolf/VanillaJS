const Twilio = require('twilio')

const client = new Twilio('AC178ea257fc306a4c16e458fb04767469', '46ebb5c0d87085f2be0d46e7ac1f1f50')

client.messages
    .list()
    .then(messages => {
        console.log(`The most recent message is ${messages[0].body}`)
    }).catch(error => console.log(error));

console.log('Gathering your messages log')