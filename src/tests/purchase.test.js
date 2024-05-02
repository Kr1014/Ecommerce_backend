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

  test("POST -> 'URL_BASE', should return status code 201, and res.body.quantity === cart.quantity", async()=>{
    
  })