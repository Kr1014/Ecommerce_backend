const express = require('express');
const routerUser = require('./user.route');
const routerCategory = require('./category.route');
const routerProduct = require('./product.route');
const routerPurchase = require('./purchase.route');
const routerCart = require('./cart.route');
const routerProductImg = require('./productImg.route');
const router = express.Router();

// colocar las rutas aquí

router.use("/users", routerUser)
router.use("/categories", routerCategory)
router.use("/products", routerProduct )
router.use("/purchase", routerPurchase)
router.use("/cart", routerCart)
router.use("/product_images", routerProductImg)


module.exports = router;