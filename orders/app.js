const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
const app = express();

app.use(express.json());

const connection = mysql.createConnection({
  host: 'products_database',
  user: 'root',
  password: '1234',
  database: 'products'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

app.post('/orders', async (req, res) => {
  const { product_id, quantity } = req.body;

  try {
    await new Promise((resolve, reject) => {
      connection.beginTransaction(err => {
        if (err) return reject(err);
        resolve();
      });
    });

    const [product] = await new Promise((resolve, reject) => {
      connection.query('SELECT quantity, price, weight FROM products WHERE id = ?', [product_id], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    if (!product || product.quantity < quantity) {
      return res.status(400).send('Quantidade de produto insuficiente.');
    }

    const total_price = product.price * quantity;

    const shippingResponse = await axios.post('http://php_shipping_calculator:8000', {
      quantity,
      weight: product.weight * quantity
    });

    const { cost: shipping_cost, delivery_time } = shippingResponse.data;

    const result = await new Promise((resolve, reject) => {
      connection.query('INSERT INTO orders (product_id, quantity, total_price, shipping_cost, delivery_time) VALUES (?, ?, ?, ?, ?)', 
      [product_id, quantity, total_price, shipping_cost, delivery_time], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    const order_id = result.insertId;

    await new Promise((resolve, reject) => {
      connection.query('UPDATE products SET quantity = quantity - ? WHERE id = ?', [quantity, product_id], (error) => {
        if (error) return reject(error);
        resolve();
      });
    });

    await new Promise((resolve, reject) => {
      connection.commit(err => {
        if (err) return reject(err);
        resolve();
      });
    });

    res.status(201).send({ order_id, product_id, quantity, total_price, shipping_cost, delivery_time });

  } catch (error) {
    connection.rollback(() => {
      res.status(500).send('Erro ao processar o pedido: ' + error.message);
    });
  }
});

if (require.main === module) {
  const PORT = 3333;
  app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
  });
}

module.exports = app;
