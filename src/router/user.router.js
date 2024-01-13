const { Router } = require("express");
const { getAll, create, getOne, remove, update } = require("../controllers/user.controllers");

const routerUser = Router();

routerUser.route('/')
    .get(getAll)
    .post(create)

routerUser.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update)





module.exports = routerUser;