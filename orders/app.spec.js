const request = require('supertest');
const app = require('./app');

(async () => {
  const { expect } = await import('chai');

  describe('POST /orders', () => {
    it('should respond with 201 status code and order details', async () => {
      const response = await request(app)
        .post('/orders')
        .send({ product_id: 1, quantity: 1 });

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('order_id');
      expect(response.body).to.have.property('product_id', 1);
      expect(response.body).to.have.property('quantity', 1);
    });

    it('should respond with 400 status code for insufficient product quantity', async () => {
      const response = await request(app)
        .post('/orders')
        .send({ product_id: 1, quantity: 99999 });

      expect(response.status).to.equal(400);
      expect(response.text).to.equal('Quantidade de produto insuficiente.');
    });
  });

  run();
})();
