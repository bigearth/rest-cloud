let express = require('express');
let router = express.Router();

/* GET clones listing. */
router.get('/', (req, res, next) => {
  res.send('');
});

router.get('/:id/health-check', (req, res, next) => {
  res.send('healthy and happy');
});

router.get('/:id/mqtt', (req, res, next) => {
  let mqtt = require('mqtt');
  var client = mqtt.connect('mqtts://jqpcdchr:scRzM1YSc4kh@m13.cloudmqtt.com:10805');
  client.on('connect', function() {
    // subscribe to a topic
    client.subscribe('hello/world', function() {
      // when a message arrives, do something with it
      client.on('message', function(topic, message, packet) {
        console.log("Received '" + message + "' on '" + topic + "'");
      });
    });

    // publish a message to a topic
    client.publish('hello/world', 'my message', function() {
      console.log("Message is published");
      client.end(); // Close the connection when published
    });
  });
});

module.exports = router;
