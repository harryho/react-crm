import * as orderService from './orderService';

// Re-declare constants from the module for test verification
const MOCK_API_BASE_URL_ORDERS = "http://16.171.228.168:5000/api/orders";
const MOCK_AUTH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjdHOEp0amo4bXF0WlF2djkifQ.eyJhdWQiOiJodHRwczovL2FwaS5kZWxpdmVyZWN0LmNvbSIsImV4cCI6MTc0NzI5Mjg4MiwiaWF0IjoxNzQ3MjA2NDgyLCJpc3MiOiJodHRwczovL2FwaS5kZWxpdmVyZWN0LmNvbSIsImF6cCI6ImN6RmNLWU9Nc3RpOUF3aDYiLCJzdWIiOiJjekZjS1lPTXN0aTlBd2g2QGNsaWVudHMiLCJzY29wZSI6InN0b3JlIGdlbmVyaWNQT1MifQ.XJNiA8unlkXA4EohTLs1o9LunasORsng1hiF3C02CLE6fRk77K-jAlMdOy_GTGWQHSC_fij7YBngfEMMSFPrZ8sl0rZyi502p0tEpE8kHfTt6D3ec7H7IjkXT_DPwrPTSnlCknvTR2eHR3fB2hIUSaRQ5r81cZA8ccS1DXRwdZlGlz7f38HLGloxRha9G8CtAIxAZj44RAzg0ITAliVNQHL5yLd1AxMoGhHA9D64gVLq9LxFQrhTjHkmxH8r_k_8iCYgDlRHV1HI3C_-mcDTOvCmbtqeemrkB76AQXCI0kv2yRs3aWPyUqd0APjfwa_uvR7Lt83E10I412ZJ0wlWxQ';

const expectedHeaders = {
  'Authorization': `Bearer ${MOCK_AUTH_TOKEN}`,
  'Content-Type': 'application/json'
};

// Mock global fetch
global.fetch = jest.fn();

// Mock console.error
let consoleErrorSpy: jest.SpyInstance;

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
});

afterEach(() => {
  consoleErrorSpy.mockRestore();
});

describe('orderService', () => {

  describe('getAllItems', () => {
    it('should fetch all orders if response has "orders" key', async () => {
      const mockOrders = [{ id: '1', item: 'Order 1' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ orders: mockOrders, total: 1 }),
      });
      const result = await orderService.getAllItems();
      expect(fetch).toHaveBeenCalledWith(MOCK_API_BASE_URL_ORDERS, { headers: expectedHeaders });
      expect(result).toEqual(mockOrders);
    });

    it('should fetch all orders if response has "items" key', async () => {
      const mockOrders = [{ id: '2', item: 'Order 2' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: mockOrders, total: 1 }),
      });
      const result = await orderService.getAllItems();
      expect(result).toEqual(mockOrders);
    });

    it('should fetch all orders if response is a direct array', async () => {
      const mockOrders = [{ id: '3', item: 'Order 3' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockOrders,
      });
      const result = await orderService.getAllItems();
      expect(result).toEqual(mockOrders);
    });

    it('should return empty array for unexpected structure', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [], count: 0 }),
      });
      const result = await orderService.getAllItems();
      expect(result).toEqual([]);
    });

    it('should throw an error and log on API error (ok: false)', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });
      await expect(orderService.getAllItems()).rejects.toThrow('HTTP error! status: 500');
      expect(console.error).toHaveBeenCalledWith("Error fetching all orders:", expect.any(Error));
    });

    it('should throw an error and log on network error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network failure'));
      await expect(orderService.getAllItems()).rejects.toThrow('Network failure');
      expect(console.error).toHaveBeenCalledWith("Error fetching all orders:", expect.any(Error));
    });
  });

  describe('getItemById', () => {
    const orderId = 'order123';
    it('should fetch an order by ID', async () => {
      const mockOrder = { id: orderId, item: 'Specific Order' };
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => mockOrder });
      const result = await orderService.getItemById(orderId);
      expect(fetch).toHaveBeenCalledWith(`${MOCK_API_BASE_URL_ORDERS}/${orderId}`, { headers: expectedHeaders });
      expect(result).toEqual(mockOrder);
    });

    it('should return null if order not found (404)', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 404 });
      const result = await orderService.getItemById(orderId);
      expect(result).toBeNull();
    });

    it('should throw an error and log on API error (non-404)', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });
      await expect(orderService.getItemById(orderId)).rejects.toThrow('HTTP error! status: 500');
      expect(console.error).toHaveBeenCalledWith(`Error fetching order by id ${orderId}:`, expect.any(Error));
    });
  });

  describe('getItemsByPageNumber', () => {
    const page = 1, pageSize = 3;
    it('should fetch orders by page (response with "orders" key)', async () => {
      const mockOrders = [{ id: 'p1', item: 'Paged Order 1' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ orders: mockOrders, total: 5 }),
      });
      const result = await orderService.getItemsByPageNumber(page, pageSize);
      expect(fetch).toHaveBeenCalledWith(`${MOCK_API_BASE_URL_ORDERS}?page=${page}&size=${pageSize}`, { headers: expectedHeaders });
      expect(result).toEqual({ items: mockOrders, total: 5 });
    });

    it('should fetch orders by page (response with "items" key)', async () => {
      const mockOrders = [{ id: 'p2', item: 'Paged Order 2' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: mockOrders, total: 5 }),
      });
      const result = await orderService.getItemsByPageNumber(page, pageSize);
      expect(result).toEqual({ items: mockOrders, total: 5 });
    });

    it('should fetch orders by page (response is direct array)', async () => {
      const mockOrders = [{ id: 'p3', item: 'Paged Order 3' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockOrders, // Direct array
      });
      const result = await orderService.getItemsByPageNumber(page, pageSize);
      expect(result).toEqual({ items: mockOrders, total: 0 }); // Total defaults to 0
    });

    it('should return empty items and total 0 for unexpected structure', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [], count: 0 }),
      });
      const result = await orderService.getItemsByPageNumber(page, pageSize);
      expect(result).toEqual({ items: [], total: 0 });
    });

    it('should throw an error and log on API error', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });
      await expect(orderService.getItemsByPageNumber(page, pageSize)).rejects.toThrow('HTTP error! status: 500');
      expect(console.error).toHaveBeenCalledWith(`Error fetching orders for page ${page}:`, expect.any(Error));
    });
  });

  describe('Mutation Placeholders', () => {
    const testData = { item: 'Test Order' };
    it('addItem should reject as not implemented', async () => {
      await expect(orderService.addItem(testData)).rejects.toEqual("addItem (order) not implemented");
    });
    it('updateItem should reject as not implemented', async () => {
      await expect(orderService.updateItem(testData)).rejects.toEqual("updateItem (order) not implemented");
    });
    it('deleteItemById should reject as not implemented', async () => {
      await expect(orderService.deleteItemById('id1')).rejects.toEqual("deleteItemById (order) not implemented");
    });
  });
});
