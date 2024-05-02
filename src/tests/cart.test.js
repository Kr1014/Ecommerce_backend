require('../models')
const request = require("supertest")
const app = require('../app')
const Product = require("../models/Product")

const URL_BASE = '/api/v1/cart'

let TOKEN
let userId
let bodyProduct
let product
let cart
let cartId

beforeAll(async () => {
  const user = {
    email: "yoneison@gmail.com",
    password: "yoneison1234"
  }

  const res = await request(app)
    .post('/api/v1/users/login')
    .send(user)

  TOKEN = res.body.token
  userId = res.body.user.id

    bodyProduct = {
        title: "Sweater",
        description: "Oversized Wool Sweater for Men, Winter Wool",
        price: 90
  }

  product = await Product.create(bodyProduct)
})

test("POST -> 'URL_BASE', should return status code 201, and res.body.quantity === cart.quantity", async () => {

  cart = {
    quantity: 2,
    productId: product.id
  }

  const res = await request(app)
    .post(URL_BASE)
    .send(cart)
    .set("Authorization", `Bearer ${TOKEN}`)

  cartId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.quantity).toBe(cart.quantity)

})

test("GET -> URL_BASE, should return statusCode 200, and res.body.lenght === 1", async () => {

  const res = await request(app)
    .get(URL_BASE)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test('GET -> URL_BASE/:id shoould return statusCode 200, and res.body.quantity ==== cart.quantity', async () => {

  const res = await request(app)
    .get(`${URL_BASE}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.quantity).toBe(cart.quantity)

})

test("PUT -> URL_BASE/:id, should return status code 200, and res.body.quantity === update.quantity", async () => {

  const update = { quantity: 4}
  const res = await request(app)
    .put(`${URL_BASE}/${cartId}`)
    .send(update)
    .set('Authorization', `Bearer ${TOKEN}`)


  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.quantity).toBe(update.quantity)
})

test("Delete 'URL_BASE/:id', should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${URL_BASE}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(204)

  await product.destroy() 
})
