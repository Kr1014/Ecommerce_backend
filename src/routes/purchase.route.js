const { getAll, create, getOne, remove, update } = require('../controllers/purchases.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerPurchase = express.Router();

routerPurchase.route('/')
    .get(verifyJwt ,getAll)
    .post(create);

module.exports = routerPurchase;