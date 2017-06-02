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
  let client = mqtt.connect(process.env.CLOUDMQTT_URL);
  client.on('connect', () => {
    // subscribe to a topic
    client.subscribe('hello/clone', () => {
      // when a message arrives, do something with it
      client.on('message', (topic, message, packet) => {
        res.send('' + message);
      });
    });

    // publish a message to a topic
    client.publish('hello/clone', 'Hello Clone', () => {
      // console.log("Message is published");
      client.end(); // Close the connection when published
    });
  });
});

module.exports = router;
