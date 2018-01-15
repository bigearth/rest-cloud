let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.connect(process.env.MONGODB_URI);

let db = mongoose.connection;

// let cloneSchema = mongoose.Schema({
//   title: String
// });
//
// let designSchema = mongoose.Schema({
//   title: String
// });

let userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  phone: {
    type: String,
    unique: true
  },
  // clones: [cloneSchema],
  // designs: [designSchema]
});

userSchema.methods.foo = function () {
  let foo = 'bar';
}

let User = mongoose.model('User', userSchema);
// let Clone = mongoose.model('Clone', cloneSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

// display list of all users
router.get('/', (req, res, next) => {
  // res.json({ status: 'getting users' });
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
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  });
  // user.clones.push({ title: 'My Clone' });
  // user.designs.push({ title: 'My amazing .stl file' });
  //
  user.save(function (err, user) {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
});

// display a specific user by username
router.get('/:username', (req, res, next) => {
  User.findOne({username: req.params.username})
  .exec(function (err, user) {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
});

// update a specific user
router.put('/:username', (req, res, next) => {
  User.findOne({'username': req.params.username}, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      if(user) {
        if(req.params.username) {
          user.username = req.params.username;
        } else {
          user.userName = user.userName;
        }

        if(req.params.firstName) {
          user.firstName = req.params.firstName;
        } else {
          user.firstName = user.firstName;
        }

        if(req.params.lastName) {
          user.lastName = req.params.lastName;
        } else {
          user.lastName = user.lastName;
        }

        if(req.params.password) {
          user.password = req.params.password;
        } else {
          user.password = user.password;
        }

        if(req.params.phone) {
          user.phone = req.params.phone;
        } else {
          user.phone = user.phone;
        }

        if(req.params.email) {
          user.email = req.params.email;
        } else {
          user.email = user.email;
        }

        user.save(function (err, updatedUser) {
          if (err) return handleError(err);
          res.send(updatedUser);
        });
      } else {
        res.send({error: 'no user w/ username: ' + req.params.username});
      }
    }
  });
});

// delete a specific user
router.delete('/:username', (req, res, next) => {
  User.remove({ username: req.params.username }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send({success: req.params.username + ' has been deleted.'});
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
