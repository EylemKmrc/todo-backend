const express = require('express'); //importieren von express
const router = express.Router();

// eine GET-Anfrage
router.get('/', async(req, res) => {

    res.send({ message: "Hello World!" });
});

module.exports = router;