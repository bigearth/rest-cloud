let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

/* GET clones listing. */
router.get('/', (req, res, next) => {
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
  res.send('');
});

// display a list of all clones for a user
router.get('/users/:id/clones', (req, res, next) => {
  res.send('GET /users/:id/clones');
});

// create a new clone for a user
router.post('/users/:id/clones', (req, res, next) => {
  res.send('POST /users:id/clones');
});

// display a specific clone for a user
router.get('/users/:id/clones/:id', (req, res, next) => {
  res.send('GET	/users/:id/clones/:id');
});

// update a specific clone for a user
router.put('/users/:id/clones/:id', (req, res, next) => {
  res.send('PUT	/users/:id/clones/:id');
});

// delete a specific clone for a user
router.delete('/users/:id/clones/:id', (req, res, next) => {
  res.send('DELETE /users/:id/clones/:id');
});

/* GET clones listing. */
router.get('/mongo', (req, res, next) => {
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

router.get('/elastic', (req, res, next) => {
  let elasticsearch = require('elasticsearch');
  let client = new elasticsearch.Client({
    host: process.env.BOSAI_URL,
    log: 'trace'
  });
  client.ping({
  // ping usually has a 3000ms timeout
    requestTimeout: 1000
  }, function (error) {
    if (error) {
      console.trace('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
  });
  res.send('elastic working!');
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

  res.send('sequelize working!');
});

module.exports = router;
