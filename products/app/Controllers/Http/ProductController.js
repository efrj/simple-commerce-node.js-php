'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async index ({ response }) {
    const products = await Product.all()
    return response.json(products)
  }

  async store ({ request, response }) {
    const { name, quantity, price, weight } = request.post()
    const product = new Product()
    product.name = name
    product.quantity = quantity
    product.price = price
    product.weight = weight

    await product.save()
    return response.status(201).json(product)
  }

  async show ({ params, response }) {
    const product = await Product.find(params.id)
    if (!product) {
      return response.status(404).json({ data: 'Resource not found' })
    }
    return response.json(product)
  }

  async update ({ params, request, response }) {
    const { name, quantity, price, weight } = request.post()
    const product = await Product.find(params.id)

    if (!product) {
      return response.status(404).json({ data: 'Resource not found' })
    }

    product.name = name
    product.quantity = quantity
    product.price = price

    await product.save()
    return response.status(200).json(product)
  }

  async destroy ({ params, response }) {
    const product = await Product.find(params.id)

    if (!product) {
      return response.status(404).json({ data: 'Resource not found' })
    }

    await product.delete()
    return response.status(204).json(null)
  }
}

module.exports = ProductController

