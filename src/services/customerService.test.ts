import * as customerService from './customerService';

// Re-declare constants from the module for test verification
const MOCK_API_BASE_URL_CUSTOMERS = "http://16.171.228.168:5000/api/customers";
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

describe('customerService', () => {

  describe('getAllItems', () => {
    it('should fetch all customers if response has "customers" key', async () => {
      const mockCustomers = [{ id: '1', name: 'Test Customer 1' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ customers: mockCustomers, total: 1 }),
      });
      const result = await customerService.getAllItems();
      expect(fetch).toHaveBeenCalledWith(MOCK_API_BASE_URL_CUSTOMERS, { headers: expectedHeaders });
      expect(result).toEqual(mockCustomers);
    });

    it('should fetch all customers if response has "items" key', async () => {
      const mockCustomers = [{ id: '2', name: 'Test Customer 2' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: mockCustomers, total: 1 }),
      });
      const result = await customerService.getAllItems();
      expect(fetch).toHaveBeenCalledWith(MOCK_API_BASE_URL_CUSTOMERS, { headers: expectedHeaders });
      expect(result).toEqual(mockCustomers);
    });

    it('should fetch all customers if response is a direct array', async () => {
      const mockCustomers = [{ id: '3', name: 'Test Customer 3' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCustomers,
      });
      const result = await customerService.getAllItems();
      expect(fetch).toHaveBeenCalledWith(MOCK_API_BASE_URL_CUSTOMERS, { headers: expectedHeaders });
      expect(result).toEqual(mockCustomers);
    });

    it('should return empty array for unexpected structure', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [], count: 0 }), // Neither customers, items, nor direct array
      });
      const result = await customerService.getAllItems();
      expect(result).toEqual([]);
    });

    it('should throw an error and log on API error (ok: false)', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });
      await expect(customerService.getAllItems()).rejects.toThrow('HTTP error! status: 500');
      expect(console.error).toHaveBeenCalledWith("Error fetching all customers:", expect.any(Error));
    });

    it('should throw an error and log on network error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network issue'));
      await expect(customerService.getAllItems()).rejects.toThrow('Network issue');
      expect(console.error).toHaveBeenCalledWith("Error fetching all customers:", expect.any(Error));
    });
  });

  describe('getItemById', () => {
    const customerId = 'cust123';
    it('should fetch a customer by ID', async () => {
      const mockCustomer = { id: customerId, name: 'Specific Customer' };
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => mockCustomer });
      const result = await customerService.getItemById(customerId);
      expect(fetch).toHaveBeenCalledWith(`${MOCK_API_BASE_URL_CUSTOMERS}/${customerId}`, { headers: expectedHeaders });
      expect(result).toEqual(mockCustomer);
    });

    it('should return null if customer not found (404)', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 404 });
      const result = await customerService.getItemById(customerId);
      expect(result).toBeNull();
    });

    it('should throw an error and log on API error (non-404)', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });
      await expect(customerService.getItemById(customerId)).rejects.toThrow('HTTP error! status: 500');
      expect(console.error).toHaveBeenCalledWith(`Error fetching customer by id ${customerId}:`, expect.any(Error));
    });
  });

  describe('getItemsByPageNumber', () => {
    const page = 1, pageSize = 5;
    it('should fetch customers by page (response with "customers" key)', async () => {
      const mockCustomers = [{ id: 'p1', name: 'Paged Cust 1' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ customers: mockCustomers, total: 10 }),
      });
      const result = await customerService.getItemsByPageNumber(page, pageSize);
      expect(fetch).toHaveBeenCalledWith(`${MOCK_API_BASE_URL_CUSTOMERS}?page=${page}&size=${pageSize}`, { headers: expectedHeaders });
      expect(result).toEqual({ items: mockCustomers, total: 10 });
    });

    it('should fetch customers by page (response with "items" key)', async () => {
      const mockCustomers = [{ id: 'p2', name: 'Paged Cust 2' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: mockCustomers, total: 10 }),
      });
      const result = await customerService.getItemsByPageNumber(page, pageSize);
      expect(result).toEqual({ items: mockCustomers, total: 10 });
    });

    it('should fetch customers by page (response is direct array)', async () => {
      const mockCustomers = [{ id: 'p3', name: 'Paged Cust 3' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCustomers, // Direct array
      });
      const result = await customerService.getItemsByPageNumber(page, pageSize);
      expect(result).toEqual({ items: mockCustomers, total: 0 }); // Total defaults to 0 if not in response
    });

    it('should return empty items and total 0 for unexpected structure', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [], count: 0 }),
      });
      const result = await customerService.getItemsByPageNumber(page, pageSize);
      expect(result).toEqual({ items: [], total: 0 });
    });

    it('should throw an error and log on API error', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });
      await expect(customerService.getItemsByPageNumber(page, pageSize)).rejects.toThrow('HTTP error! status: 500');
      expect(console.error).toHaveBeenCalledWith(`Error fetching customers for page ${page}:`, expect.any(Error));
    });
  });

  describe('Mutation Placeholders', () => {
    const testData = { name: 'Test Customer' };
    it('addItem should reject as not implemented', async () => {
      await expect(customerService.addItem(testData)).rejects.toEqual("addItem (customer) not implemented");
    });
    it('updateItem should reject as not implemented', async () => {
      await expect(customerService.updateItem(testData)).rejects.toEqual("updateItem (customer) not implemented");
    });
    it('deleteItemById should reject as not implemented', async () => {
      await expect(customerService.deleteItemById('id1')).rejects.toEqual("deleteItemById (customer) not implemented");
    });
  });
});
