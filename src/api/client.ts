import type { User, Staff, Category, Product, Order } from '../types';

// In a browser, relative URLs (e.g. "/api/users") resolve against the page's
// own origin. Node's fetch has no such default and throws on a relative URL
// before MSW even gets a chance to intercept it - so this needs a real base
// URL outside the browser (verification scripts, any future SSR/Node usage).
const BASE_URL = typeof window !== 'undefined' ? '' : 'http://localhost';

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function fetchUsers(): Promise<User[]> {
  return getJson('/api/users');
}

export function fetchUserById(id: number): Promise<User> {
  return getJson(`/api/users/${id}`);
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

export function fetchOrders(): Promise<Order[]> {
  return getJson('/api/orders');
}

export function fetchOrderById(id: number): Promise<Order> {
  return getJson(`/api/orders/${id}`);
}
