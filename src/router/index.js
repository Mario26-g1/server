const { Router } = require("express");
const routerUser = require("./user.router");

const router = Router();

// routes
router.use('/users', routerUser)


module.exports = router;