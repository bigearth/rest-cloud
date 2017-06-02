let express = require('express');
let router = express.Router();

/* GET clones listing. */
router.get('/', (req, res, next) => {
  res.send('');
});

router.get('/:id/health-check', (req, res, next) => {
  res.send('healthy and happy');
});

module.exports = router;
