var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

router.get('/hello-world', function (req, res) {
  res.render('hello-world', {'message' : 'Hello world'});
});

module.exports = router
