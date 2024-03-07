var express = require('express');
var router = express.Router();
const userModel = require('../models/userModel');

/* GET users listing. */
router.post('/register', async function (req, res) {
  const user = await userModel.create({
    email: "Junaid@mail.com",
    password: "pass",
    username: "Juniad",
  })
  res.send(user);

});


module.exports = router;
