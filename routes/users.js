let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

let db = mongoose.connection;
let userSchema = mongoose.Schema({
  name: String
});

userSchema.methods.foo = function () {
  let foo = 'bar';
}

let User = mongoose.model('User', userSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

// display list of all users
router.get('/', (req, res, next) => {
  User.find(function (err, users) {
    if (err) return console.error(err);
    res.send(users);
  });
});

// create a new user
router.post('/', (req, res, next) => {
  let user = new User({ name: req.body.name });
  user.save(function (err, user) {
    if (err) return console.error(err);
    res.send(user);
  });
});

// display a specific user
router.get('/:id', (req, res, next) => {
  User.find({name: req.params.id}, function (err, user) {
    if (err) return console.error(err);
    res.send(user);
  });
});

// update a specific user
router.put('/:id', (req, res, next) => {
  User.findOne({'name': req.params.id}, function (err, user) {
    if (err) return handleError(err);
    if(user) {
      user.name = req.body.name;
      user.save(function (err, updatedUser) {
        if (err) return handleError(err);
        res.send(updatedUser);
      });
    } else {
      res.send({error: 'no user w/ name: ' + req.params.id});
    }
  });
});

// delete a specific user
router.delete('/:id', (req, res, next) => {
  User.remove({ name: req.params.id }, function (err) {
    if (err) return handleError(err);
    res.send({success: req.params.id + ' has been deleted.'});
  });
});

// display a list of all clones for a user
router.get('/:id/clones', (req, res, next) => {
  res.send('GET /users/:id/clones');
});

// create a new clone for a user
router.post('/:id/clones', (req, res, next) => {
  res.send('POST /users:id/clones');
});

// display a specific clone for a user
router.get('/:id/clones/:id', (req, res, next) => {
  res.send('GET	/users/:id/clones/:id');
});

// update a specific clone for a user
router.put('/:id/clones/:id', (req, res, next) => {
  res.send('PUT	/users/:id/clones/:id');
});

// delete a specific clone for a user
router.delete('/:id/clones/:id', (req, res, next) => {
  res.send('DELETE /users/:id/clones/:id');
});

module.exports = router;
