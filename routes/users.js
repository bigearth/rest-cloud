let express = require('express');
let router = express.Router();

// display list of all users
router.get('/', (req, res, next) => {
  res.send('GET /users');
});

// create a new user
router.post('/', (req, res, next) => {
  res.send('POST /users');
});

// display a specific user
router.get('/:id', (req, res, next) => {
  res.send('GET	/users/:id');
});

// update a specific user
router.put('/:id', (req, res, next) => {
  res.send('PUT	/users/:id');
});

// delete a specific user
router.delete('/:id', (req, res, next) => {
  res.send('DELETE /users/:id');
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
