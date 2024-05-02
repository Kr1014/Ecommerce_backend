require("../models")

const request = require("supertest")
const app = require("../app")
const Product = require("../models/Product")
const BASE_URL = "/api/v1/purchase"

let TOKEN
let userId
let bodyProduct
let product
let cart

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

    cart = {
        quantity : 1,
        productId : product.id
    }

    await request(app)
        .post("/api/v1/cart")
        .send(cart)
        .set("Authorization" , `Bearer ${TOKEN}`)
  })

    test("POST 'URL_BASE', should return status code 201 and res.body.quantity ===cart.quantity", async () => {
        const res = await request(app)
          .post(BASE_URL)
          .set("Authorization", `Bearer ${TOKEN}`)
      
        expect(res.status).toBe(201)
        expect(res.body[0].quantity).toBe(cart.quantity)
      
      })
      
      test("GET -> 'URL_BASE',should return status code 200 res.body.length === 1", async () => {
      
        const res = await request(app)
          .get(BASE_URL)
          .set("Authorization", `Bearer ${TOKEN}`)
      
        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
      
        expect(res.body[0].userId).toBeDefined()
        expect(res.body[0].userId).toBe(userId)
      
        expect(res.body[0].product).toBeDefined()
        expect(res.body[0].product.id).toBe(product.id)
      
      
        await product.destroy()
      })