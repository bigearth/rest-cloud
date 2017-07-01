let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.connect(process.env.MONGODB_URI);

let db = mongoose.connection;

let cloneSchema = mongoose.Schema({
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String
});

let userSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  clones: [cloneSchema]
});

userSchema.methods.foo = function () {
  let foo = 'bar';
}

let User = mongoose.model('User', userSchema);
let Clone = mongoose.model('Clone', cloneSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

// display list of all users
router.get('/', (req, res, next) => {
  User.find(function (err, users) {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
});

// create a new user
router.post('/', (req, res, next) => {
  let user = new User({
    userName: req.body.userName,
    email: req.body.email
   });
  user.save(function (err, user) {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
});

// display a specific user
router.get('/:id', (req, res, next) => {
  User.findOne({userName: req.params.id})
  .populate('clones')
  .exec(function (err, user) {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
});

// update a specific user
router.put('/:id', (req, res, next) => {
  User.findOne({'userName': req.params.id}, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      if(user) {
        user.userName = req.body.userName;
        user.save(function (err, updatedUser) {
          if (err) return handleError(err);
          res.send(updatedUser);
        });
      } else {
        res.send({error: 'no user w/ userName: ' + req.params.id});
      }
    }
  });
});

// delete a specific user
router.delete('/:id', (req, res, next) => {
  User.remove({ userName: req.params.id }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send({success: req.params.id + ' has been deleted.'});
    }
  });
});

// display a list of all clones for a user
router.get('/:id/clones', (req, res, next) => {
  User.findOne({userName: req.params.id}, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
});

// create a new clone for a user
router.post('/:id/clones', (req, res, next) => {
  User.findOne({userName: req.params.id}, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      let clone = new Clone({
        title: req.body.title,
        _creator: user._id
      });

      clone.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.send(clone);
        }
      });
    }
  });
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
