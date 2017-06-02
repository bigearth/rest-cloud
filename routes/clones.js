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
    client.publish('t1', new Date().toString(), function() {
      client.end();
      res.writeHead(204, { 'Connection': 'keep-alive' });
      res.end();
    });
  });
});

module.exports = router;
