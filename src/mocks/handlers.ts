import { http, delay, HttpResponse } from 'msw';

import { users, categories, products, orders } from '../data/ecommerce';
import { staff } from '../data/staff';

const DELAY_MS = 300;

export const handlers = [
  http.get('*/api/users', async () => {
    await delay(DELAY_MS);
    return HttpResponse.json(users);
  }),

  http.get('*/api/users/:id', async ({ params }) => {
    await delay(DELAY_MS);
    const id = Number(params.id);
    const user = users.find((u) => u.userId === id);
    if (!user) {
      return HttpResponse.json({ message: `User ${id} not found` }, { status: 404 });
    }
    return HttpResponse.json(user);
  }),

  http.get('*/api/staff', async () => {
    await delay(DELAY_MS);
    return HttpResponse.json(staff);
  }),

  http.get('*/api/categories', async () => {
    await delay(DELAY_MS);
    return HttpResponse.json(categories);
  }),

  http.get('*/api/products', async () => {
    await delay(DELAY_MS);
    return HttpResponse.json(products);
  }),

  http.get('*/api/products/:id', async ({ params }) => {
    await delay(DELAY_MS);
    const id = Number(params.id);
    const product = products.find((p) => p.productId === id);
    if (!product) {
      return HttpResponse.json({ message: `Product ${id} not found` }, { status: 404 });
    }
    return HttpResponse.json(product);
  }),

  http.get('*/api/orders', async () => {
    await delay(DELAY_MS);
    return HttpResponse.json(orders);
  }),

  http.get('*/api/orders/:id', async ({ params }) => {
    await delay(DELAY_MS);
    const id = Number(params.id);
    const order = orders.find((o) => o.orderId === id);
    if (!order) {
      return HttpResponse.json({ message: `Order ${id} not found` }, { status: 404 });
    }
    return HttpResponse.json(order);
  }),
];
