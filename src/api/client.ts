import type { User, Staff, Category, Product, Order, Carrier, OrderShipTo } from '../types';

// ponytail: Node's fetch throws on a relative URL, unlike a browser; MSW still catches it either way, so BASE_URL stays empty in the browser and gets a fake origin outside.
const BASE_URL = typeof window !== 'undefined' ? '' : 'http://localhost';

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }
  assertJson(path, response);
  return response.json() as Promise<T>;
}

async function sendJson<T>(path: string, method: 'POST' | 'PUT' | 'PATCH', body: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }
  assertJson(path, response);
  return response.json() as Promise<T>;
}

function assertJson(path: string, response: Response): void {
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new Error(
      `Expected JSON from ${path} but received ${contentType || 'no content-type'}. ` +
        `MSW is the only backend in this app — if the service worker didn't intercept, ` +
        `the request hit the IIS server directly and returned an HTML page.`
    );
  }
}

async function del(path: string): Promise<void> {
  const response = await fetch(`${BASE_URL}${path}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }
}

export function fetchUsers(): Promise<User[]> {
  return getJson('/api/users');
}

export function fetchUserById(id: number): Promise<User> {
  return getJson(`/api/users/${id}`);
}

export function createUser(data: Omit<User, 'userId'>): Promise<User> {
  return sendJson('/api/users', 'POST', data);
}

export function updateUser(id: number, data: Omit<User, 'userId'>): Promise<User> {
  return sendJson(`/api/users/${id}`, 'PUT', data);
}

export function deleteUser(id: number): Promise<void> {
  return del(`/api/users/${id}`);
}

export function fetchStaff(): Promise<Staff[]> {
  return getJson('/api/staff');
}

export function fetchCategories(): Promise<Category[]> {
  return getJson('/api/categories');
}

export function fetchProducts(): Promise<Product[]> {
  return getJson('/api/products');
}

export function fetchProductById(id: number): Promise<Product> {
  return getJson(`/api/products/${id}`);
}

export function createProduct(data: Omit<Product, 'productId'>): Promise<Product> {
  return sendJson('/api/products', 'POST', data);
}

export function updateProduct(id: number, data: Omit<Product, 'productId'>): Promise<Product> {
  return sendJson(`/api/products/${id}`, 'PUT', data);
}

export function deleteProduct(id: number): Promise<void> {
  return del(`/api/products/${id}`);
}

export function fetchOrders(): Promise<Order[]> {
  return getJson('/api/orders');
}

export function fetchOrderById(id: number): Promise<Order> {
  return getJson(`/api/orders/${id}`);
}

export function updateOrderStatus(id: number, status: string): Promise<Order> {
  return sendJson(`/api/orders/${id}/status`, 'PATCH', { status });
}

export function fetchCarriers(): Promise<Carrier[]> {
  return getJson('/api/carriers');
}

export function createOrder(data: {
  userId: number;
  items: { variantId: number; qty: number }[];
  shipTo: OrderShipTo;
}): Promise<Order> {
  return sendJson('/api/orders', 'POST', data);
}

export function recordPayment(
  orderId: number,
  data: { provider: string; amount: number; providerRef?: string }
): Promise<Order> {
  return sendJson(`/api/orders/${orderId}/payment`, 'PATCH', data);
}

export function recordShipment(
  orderId: number,
  data: { carrierId: number; trackingNumber?: string }
): Promise<Order> {
  return sendJson(`/api/orders/${orderId}/shipment`, 'PATCH', data);
}
