'use strict'

const { test, trait } = use('Test/Suite')('ProductController')
const Product = use('App/Models/Product')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('get list of all products', async ({ client }) => {
  await Product.create({ name: 'Arroz', quantity: 100, price: 19.99, weight: 5 })
  await Product.create({ name: 'Feijão', quantity: 80, price: 12.49, weight: 4 })

  const response = await client.get('/products').end()

  response.assertStatus(200)
  response.assertJSONSubset([
    { name: 'Arroz', quantity: 100, price: 19.99, weight: 5 },
    { name: 'Feijão', quantity: 80, price: 12.49, weight: 4 }
  ])
})

test('create a new product', async ({ client }) => {
  const response = await client.post('/products').send({
    name: 'Macarrão',
    quantity: 60,
    price: 5.99,
    weight: 3
  }).end()

  response.assertStatus(201)
  response.assertJSONSubset({
    name: 'Macarrão',
    quantity: 60,
    price: 5.99,
    weight: 3
  })
})

test('get a single product', async ({ client }) => {
  const product = await Product.create({ name: 'Arroz', quantity: 100, price: 19.99, weight: 3 })

  const response = await client.get(`/products/${product.id}`).end()

  response.assertStatus(200)
  response.assertJSONSubset({ name: 'Arroz', quantity: 100, price: 19.99, weight: 3 })
})

test('update a product', async ({ client }) => {
  const product = await Product.create({ name: 'Arroz', quantity: 100, price: 19.99, weight: 3 })

  const response = await client.put(`/products/${product.id}`).send({
    name: 'Feijão',
    quantity: 80,
    price: 12.49,
    weight: 3
  }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: 'Feijão',
    quantity: 80,
    price: 12.49,
    weight: 3
  })
})

test('delete a product', async ({ client }) => {
  const product = await Product.create({ name: 'Arroz', quantity: 100, price: 19.99, weight: 3 })

  const response = await client.delete(`/products/${product.id}`).end()

  response.assertStatus(204)
})