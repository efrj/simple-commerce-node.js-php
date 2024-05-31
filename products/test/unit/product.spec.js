'use strict'

const { test, trait } = use('Test/Suite')('Product')
const Product = use('App/Models/Product')

trait('DatabaseTransactions')

test('create a product', async ({ assert }) => {
  const product = await Product.create({
    name: 'Arroz',
    quantity: 100,
    price: 19.99,
    weight: 5
  })

  assert.equal(product.name, 'Arroz')
  assert.equal(product.quantity, 100)
  assert.equal(product.price, 19.99)
  assert.equal(product.weight, 5)
})

test('update a product', async ({ assert }) => {
  let product = await Product.create({
    name: 'Arroz',
    quantity: 100,
    price: 19.99,
    weight: 5
  })

  product.name = 'Feijão'
  product.quantity = 80
  product.price = 12.49
  product.weight = 4
  await product.save()

  product = await Product.find(product.id)

  assert.equal(product.name, 'Feijão')
  assert.equal(product.quantity, 80)
  assert.equal(product.price, 12.49)
  assert.equal(product.weight, 4)
})

test('delete a product', async ({ assert }) => {
  const product = await Product.create({
    name: 'Arroz',
    quantity: 100,
    price: 19.99,
    weight: 5,
  })

  await product.delete()

  const deletedProduct = await Product.find(product.id)

  assert.isNull(deletedProduct)
})