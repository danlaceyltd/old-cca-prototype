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



//Upload rates branch
router.get('/property-linking/1/find-property/upload-rates-bill', function (req, res) {

  var haveRatesBill = req.query.hasRatesBill

  if (haveRatesBill === 'false') {
    res.redirect('/property-linking/1/find-property/upload-evidence')
  } else {
    res.render('property-linking/1/find-property/upload-rates-bill')
  }
})


module.exports = router
