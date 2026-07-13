import { http, delay, HttpResponse } from 'msw';

import type { User, Product, Order, OrderItem, OrderShipTo } from '../types';
import { users, categories, products, orders, carriers } from '../data/ecommerce';
import { staff } from '../data/staff';

const DELAY_MS = 300;
const SHIPPING_FLAT_FEE = 9.99;

// ponytail: in-memory mutable copies so writes during a session are visible to subsequent GETs; resets on page reload (no real backend).
let usersDb: User[] = [...users];
let productsDb: Product[] = [...products];
let ordersDb: Order[] = [...orders];

function nextId<T>(items: T[], key: keyof T): number {
  const ids = items.map((item) => Number(item[key]) || 0);
  return (ids.length ? Math.max(...ids) : 0) + 1;
}

export const handlers = [
  http.get('*/api/users', async () => {
    await delay(DELAY_MS);
    return HttpResponse.json(usersDb);
  }),

  http.get('*/api/users/:id', async ({ params }) => {
    await delay(DELAY_MS);
    const id = Number(params.id);
    const user = usersDb.find((u) => u.userId === id);
    if (!user) {
      return HttpResponse.json({ message: `User ${id} not found` }, { status: 404 });
    }
    return HttpResponse.json(user);
  }),

  http.post('*/api/users', async ({ request }) => {
    await delay(DELAY_MS);
    const body = (await request.json()) as Omit<User, 'userId'>;
    const user: User = { ...body, userId: nextId(usersDb, 'userId') };
    usersDb = [...usersDb, user];
    return HttpResponse.json(user, { status: 201 });
  }),

  http.put('*/api/users/:id', async ({ params, request }) => {
    await delay(DELAY_MS);
    const id = Number(params.id);
    const index = usersDb.findIndex((u) => u.userId === id);
    if (index === -1) {
      return HttpResponse.json({ message: `User ${id} not found` }, { status: 404 });
    }
    const body = (await request.json()) as Partial<User>;
    const updated: User = { ...usersDb[index], ...body, userId: id };
    usersDb = [...usersDb.slice(0, index), updated, ...usersDb.slice(index + 1)];
    return HttpResponse.json(updated);
  }),

  http.delete('*/api/users/:id', async ({ params }) => {
    await delay(DELAY_MS);
    const id = Number(params.id);
    if (!usersDb.some((u) => u.userId === id)) {
      return HttpResponse.json({ message: `User ${id} not found` }, { status: 404 });
    }
    usersDb = usersDb.filter((u) => u.userId !== id);
    return new HttpResponse(null, { status: 204 });
  }),

  http.get('*/api/carriers', async () => {
    await delay(DELAY_MS);
    return HttpResponse.json(carriers);
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
    return HttpResponse.json(productsDb);
  }),

  http.get('*/api/products/:id', async ({ params }) => {
    await delay(DELAY_MS);
    const id = Number(params.id);
    const product = productsDb.find((p) => p.productId === id);
    if (!product) {
      return HttpResponse.json({ message: `Product ${id} not found` }, { status: 404 });
    }
    return HttpResponse.json(product);
  }),

  http.post('*/api/products', async ({ request }) => {
    await delay(DELAY_MS);
    const body = (await request.json()) as Omit<Product, 'productId'>;
    const product: Product = { ...body, productId: nextId(productsDb, 'productId') };
    productsDb = [...productsDb, product];
    return HttpResponse.json(product, { status: 201 });
  }),

  http.put('*/api/products/:id', async ({ params, request }) => {
    await delay(DELAY_MS);
    const id = Number(params.id);
    const index = productsDb.findIndex((p) => p.productId === id);
    if (index === -1) {
      return HttpResponse.json({ message: `Product ${id} not found` }, { status: 404 });
    }
    const body = (await request.json()) as Partial<Product>;
    const updated: Product = { ...productsDb[index], ...body, productId: id };
    productsDb = [...productsDb.slice(0, index), updated, ...productsDb.slice(index + 1)];
    return HttpResponse.json(updated);
  }),

  http.delete('*/api/products/:id', async ({ params }) => {
    await delay(DELAY_MS);
    const id = Number(params.id);
    if (!productsDb.some((p) => p.productId === id)) {
      return HttpResponse.json({ message: `Product ${id} not found` }, { status: 404 });
    }
    productsDb = productsDb.filter((p) => p.productId !== id);
    return new HttpResponse(null, { status: 204 });
  }),

  http.get('*/api/orders', async () => {
    await delay(DELAY_MS);
    return HttpResponse.json(ordersDb);
  }),

  http.get('*/api/orders/:id', async ({ params }) => {
    await delay(DELAY_MS);
    const id = Number(params.id);
    const order = ordersDb.find((o) => o.orderId === id);
    if (!order) {
      return HttpResponse.json({ message: `Order ${id} not found` }, { status: 404 });
    }
    return HttpResponse.json(order);
  }),

  http.patch('*/api/orders/:id/status', async ({ params, request }) => {
    await delay(DELAY_MS);
    const id = Number(params.id);
    const index = ordersDb.findIndex((o) => o.orderId === id);
    if (index === -1) {
      return HttpResponse.json({ message: `Order ${id} not found` }, { status: 404 });
    }
    const { status } = (await request.json()) as { status: string };
    const current = ordersDb[index];
    const updated: Order = {
      ...current,
      status,
      statusHistory: [...current.statusHistory, { status, changedAt: new Date().toISOString() }],
    };
    ordersDb = [...ordersDb.slice(0, index), updated, ...ordersDb.slice(index + 1)];
    return HttpResponse.json(updated);
  }),

  http.post('*/api/orders', async ({ request }) => {
    await delay(DELAY_MS);
    const body = (await request.json()) as {
      userId: number;
      items: { variantId: number; qty: number }[];
      shipTo: OrderShipTo;
    };

    const items: OrderItem[] = body.items.map(({ variantId, qty }) => {
      const product = productsDb.find((p) => p.variants.some((v) => v.variantId === variantId))!;
      const variant = product.variants.find((v) => v.variantId === variantId)!;
      return {
        variantId,
        productName: product.name,
        sku: variant.sku,
        unitPrice: variant.price,
        qty,
        discount: 0,
        lineTotal: variant.price * qty,
      };
    });

    productsDb = productsDb.map((product) => ({
      ...product,
      variants: product.variants.map((variant) => {
        const item = body.items.find((i) => i.variantId === variant.variantId);
        return item ? { ...variant, quantityOnHand: Math.max(0, variant.quantityOnHand - item.qty) } : variant;
      }),
    }));

    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
    const orderId = nextId(ordersDb, 'orderId');
    const now = new Date().toISOString();
    const order: Order = {
      orderId,
      orderNumber: `ORD-${orderId}`,
      userId: body.userId,
      status: 'pending',
      currency: 'USD',
      subtotal,
      discountTotal: 0,
      shippingTotal: SHIPPING_FLAT_FEE,
      grandTotal: subtotal + SHIPPING_FLAT_FEE,
      shipTo: body.shipTo,
      orderedAt: now,
      items,
      statusHistory: [{ status: 'pending', changedAt: now }],
    };
    ordersDb = [...ordersDb, order];
    return HttpResponse.json(order, { status: 201 });
  }),

  http.patch('*/api/orders/:id/payment', async ({ params, request }) => {
    await delay(DELAY_MS);
    const id = Number(params.id);
    const index = ordersDb.findIndex((o) => o.orderId === id);
    if (index === -1) {
      return HttpResponse.json({ message: `Order ${id} not found` }, { status: 404 });
    }
    const body = (await request.json()) as { provider: string; amount: number; providerRef?: string };
    const current = ordersDb[index];
    const now = new Date().toISOString();
    const updated: Order = {
      ...current,
      status: 'paid',
      payment: {
        amount: body.amount,
        currency: current.currency,
        provider: body.provider,
        providerRef: body.providerRef,
        status: 'captured',
        createdAt: now,
      },
      statusHistory: [...current.statusHistory, { status: 'paid', changedAt: now }],
    };
    ordersDb = [...ordersDb.slice(0, index), updated, ...ordersDb.slice(index + 1)];
    return HttpResponse.json(updated);
  }),

  http.patch('*/api/orders/:id/shipment', async ({ params, request }) => {
    await delay(DELAY_MS);
    const id = Number(params.id);
    const index = ordersDb.findIndex((o) => o.orderId === id);
    if (index === -1) {
      return HttpResponse.json({ message: `Order ${id} not found` }, { status: 404 });
    }
    const body = (await request.json()) as { carrierId: number; trackingNumber?: string };
    const carrier = carriers.find((c) => c.carrierId === body.carrierId);
    const current = ordersDb[index];
    const now = new Date().toISOString();
    const updated: Order = {
      ...current,
      status: 'shipped',
      shipment: {
        carrierId: body.carrierId,
        carrierName: carrier?.name ?? `Carrier ${body.carrierId}`,
        trackingNumber: body.trackingNumber,
        shippedAt: now,
      },
      statusHistory: [...current.statusHistory, { status: 'shipped', changedAt: now }],
    };
    ordersDb = [...ordersDb.slice(0, index), updated, ...ordersDb.slice(index + 1)];
    return HttpResponse.json(updated);
  }),
];
