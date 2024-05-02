require("../models")

const request = require("supertest")
const app = require("../app")
const Category = require("../models/Category")

const BASE_URL= "/api/v1/products"

let TOKEN
let category
let product
let productId

beforeAll(async () => {

    const user = {
      email: "yoneison@gmail.com",
      password: "yoneison1234"
    }
  
    const res = await request(app)
      .post('/api/v1/users/login')
      .send(user)
  
    TOKEN = res.body.token
  
    category = await Category.create({ name: 'tecno' })
  })


test('POST -> BASE_URL, should return statusCode 201, and res.body.price === product.price', async()=>{

    product = {
        title: "Celular",
        description: "iphone 14 128gb",
        price: 490,
        categoryId: category.id
    }

    const res = await request(app)
        .post(BASE_URL)
        .send(product)
        .set("Authorization", `Bearer ${TOKEN}`)

        productId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
})

test("GET -> BASE_URL, should return statusCode 200, and res.body===1", async()=>{
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET -> BASE_URL/:id, should return statusCode 200, and res.body===1", async()=>{
    const res = await request(app)
        .get(`${BASE_URL}/${productId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
})

test("PUT 'BASE_URL/:id' should return statusCode 201 and res.body.title === product.title", async()=>{
     const bodyUpdate = {
        title : "Iphone 13"
    }
    const res = await request(app)
        .put(`${BASE_URL}/${productId}`)
        .send(bodyUpdate)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(bodyUpdate.title)
})

test("DELETE 'BASE_URL/:id'  should return statusCode 204", async()=>{
    const res = await request(app)
        .delete(`${BASE_URL}/${productId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
    
    expect(res.statusCode).toBe(204)

    await category.destroy()

})