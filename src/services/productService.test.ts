import * as productService from './productService';

// Re-declare constants from the module for test verification
const MOCK_API_BASE_URL = "http://16.171.228.168:5000/api";
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
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error output during tests
});

afterEach(() => {
  consoleErrorSpy.mockRestore();
});

describe('productService', () => {

  describe('getAllItems', () => {
    it('should fetch all products and include auth header, returning items array', async () => {
      const mockProducts = [{ id: '1', name: 'Test Product 1' }];
      const mockApiResponse = { items: mockProducts, total: 1 };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      const result = await productService.getAllItems();

      expect(fetch).toHaveBeenCalledWith(`${MOCK_API_BASE_URL}/items`, { headers: expectedHeaders });
      expect(result).toEqual(mockProducts); // Service extracts items
    });

    it('should return empty array if API response has no items key', async () => {
      const mockApiResponse = { total: 0 }; // Missing 'items'
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });
      const result = await productService.getAllItems();
      expect(result).toEqual([]);
    });

    it('should throw an error and log to console on API error (ok: false)', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(productService.getAllItems()).rejects.toThrow('HTTP error! status: 500');
      expect(console.error).toHaveBeenCalledWith("Error fetching all items:", expect.any(Error));
    });

    it('should throw an error and log to console on network error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network failure'));

      await expect(productService.getAllItems()).rejects.toThrow('Network failure');
      expect(console.error).toHaveBeenCalledWith("Error fetching all items:", expect.any(Error));
    });
  });

  describe('getItemById', () => {
    const productId = 'prod123';
    it('should fetch a product by ID and include auth header', async () => {
      const mockProduct = { id: productId, name: 'Specific Product' };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct,
      });

      const result = await productService.getItemById(productId);

      expect(fetch).toHaveBeenCalledWith(`${MOCK_API_BASE_URL}/items/${productId}`, { headers: expectedHeaders });
      expect(result).toEqual(mockProduct);
    });

    it('should return null and log to console if product not found (404)', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const result = await productService.getItemById(productId);

      expect(result).toBeNull();
      // No console.error for 404 as it's handled as a valid "not found" case by returning null
    });

    it('should throw an error and log to console on API error (non-404)', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(productService.getItemById(productId)).rejects.toThrow('HTTP error! status: 500');
      expect(console.error).toHaveBeenCalledWith(`Error fetching item by id ${productId}:`, expect.any(Error));
    });
  });

  describe('getItemsByPageNumber', () => {
    const page = 2;
    const pageSize = 5;
    it('should fetch products by page number and include auth header and query params', async () => {
      const mockProducts = [{ id: 'pageProd1', name: 'Paged Product' }];
      const mockApiResponse = { items: mockProducts, total: 20 };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      const result = await productService.getItemsByPageNumber(page, pageSize);

      expect(fetch).toHaveBeenCalledWith(
        `${MOCK_API_BASE_URL}/items?page=${page}&size=${pageSize}`,
        { headers: expectedHeaders }
      );
      expect(result).toEqual({ items: mockProducts, total: 20 });
    });

    it('should return items as empty array and total 0 if API response is not structured as expected', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ unexpected_structure: [], count: 0 }), // No items or total
      });
      const result = await productService.getItemsByPageNumber(page, pageSize);
      expect(result).toEqual({ items: [], total: 0 });
    });

    it('should return items from data.products if data.items is not present', async () => {
      const mockProducts = [{ id: 'pageProd1', name: 'Paged Product' }];
      const mockApiResponse = { products: mockProducts, total: 20 };
       (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });
      const result = await productService.getItemsByPageNumber(page, pageSize);
      expect(result).toEqual({ items: mockProducts, total: 20 });
    });

    it('should return items if data is a direct array (though total will be 0)', async () => {
      const mockProductsArray = [{ id: 'pageProd1', name: 'Paged Product' }];
       (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProductsArray, // Direct array
      });
      const result = await productService.getItemsByPageNumber(page, pageSize);
      expect(result).toEqual({ items: mockProductsArray, total: 0 });
    });


    it('should throw an error and log to console on API error', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(productService.getItemsByPageNumber(page, pageSize)).rejects.toThrow('HTTP error! status: 500');
      expect(console.error).toHaveBeenCalledWith(`Error fetching items for page ${page}:`, expect.any(Error));
    });
  });

  describe('Mutation Placeholders', () => {
    const testData = { name: 'Test' };

    it('addItem should be an async function that rejects', async () => {
      expect(productService.addItem).toBeInstanceOf(Function);
      await expect(productService.addItem(testData)).rejects.toEqual("addItem not implemented");
    });

    it('updateItem should be an async function that rejects', async () => {
      expect(productService.updateItem).toBeInstanceOf(Function);
      await expect(productService.updateItem(testData)).rejects.toEqual("updateItem not implemented");
    });

    it('deleteItemById should be an async function that rejects', async () => {
      expect(productService.deleteItemById).toBeInstanceOf(Function);
      await expect(productService.deleteItemById('id123')).rejects.toEqual("deleteItemById not implemented");
    });
  });
});
