let express = require('express');
let router = express.Router();

/* GET clones listing. */
router.get('/', (req, res, next) => {
  res.send('');
});

/* GET clones listing. */
router.get('/mongo', (req, res, next) => {
  let mongoose = require('mongoose');
  mongoose.connect(process.env.MONGODB_URI);
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    let cloneSchema = mongoose.Schema({
        name: String
    });
    cloneSchema.methods.print = function () {
      let gcode = 'G29';
      console.log(gcode);
    }

    let Clone = mongoose.model('Clone', cloneSchema);
    let c1a = new Clone({ name: 'c1a' });
    c1a.save(function (err, c1a) {
      if (err) return console.error(err);
      c1a.print();
    });
  });
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

router.get('/sequelize', (req, res, next) => {
  const Sequelize = require('sequelize');
  const sequelize = new Sequelize(process.env.DATABASE_URL,
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  });
  const Clone = sequelize.define('clone', {
    name: Sequelize.STRING
  });
  sequelize.sync()
  .then(() => Clone.create({
    username: 'c1a'
  }))
  .then(clone => {
    console.log(clone.get({
      plain: true
    }));
  });

  res.send('healthy and happy');
});

module.exports = router;
