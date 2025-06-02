import * as agentService from './agentService';

// Re-declare constants from the module for test verification
const MOCK_API_BASE_URL_AGENTS = "http://16.171.228.168:5000/api/agents";
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

describe('agentService', () => {

  describe('roleArray', () => {
    it('should return the static array of roles', () => {
      const roles = agentService.roleArray();
      expect(Array.isArray(roles)).toBe(true);
      expect(roles.length).toBeGreaterThan(0);
      // Check for a known role
      expect(roles).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: "1", title: 'Sales Leader' })
        ])
      );
      // Check a specific role by its properties
      const hrManagerRole = roles.find(role => role.id === "2");
      expect(hrManagerRole).toEqual({ id: "2", title: 'Hr Manager' });
    });
  });

  describe('getAllItems', () => {
    it('should fetch all agents if response has "agents" key', async () => {
      const mockAgents = [{ id: '1', name: 'Agent Smith' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ agents: mockAgents, total: 1 }),
      });
      const result = await agentService.getAllItems();
      expect(fetch).toHaveBeenCalledWith(MOCK_API_BASE_URL_AGENTS, { headers: expectedHeaders });
      expect(result).toEqual(mockAgents);
    });

    it('should fetch all agents if response has "items" key', async () => {
      const mockAgents = [{ id: '2', name: 'Agent Brown' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: mockAgents, total: 1 }),
      });
      const result = await agentService.getAllItems();
      expect(result).toEqual(mockAgents);
    });

    it('should fetch all agents if response is a direct array', async () => {
      const mockAgents = [{ id: '3', name: 'Agent Jones' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockAgents,
      });
      const result = await agentService.getAllItems();
      expect(result).toEqual(mockAgents);
    });

    it('should return empty array for unexpected structure', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [], count: 0 }),
      });
      const result = await agentService.getAllItems();
      expect(result).toEqual([]);
    });

    it('should throw an error and log on API error (ok: false)', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });
      await expect(agentService.getAllItems()).rejects.toThrow('HTTP error! status: 500');
      expect(console.error).toHaveBeenCalledWith("Error fetching all agents:", expect.any(Error));
    });

    it('should throw an error and log on network error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network failure'));
      await expect(agentService.getAllItems()).rejects.toThrow('Network failure');
      expect(console.error).toHaveBeenCalledWith("Error fetching all agents:", expect.any(Error));
    });
  });

  describe('getItemById', () => {
    const agentId = 'agent007';
    it('should fetch an agent by ID', async () => {
      const mockAgent = { id: agentId, name: 'James Bond' };
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => mockAgent });
      const result = await agentService.getItemById(agentId);
      expect(fetch).toHaveBeenCalledWith(`${MOCK_API_BASE_URL_AGENTS}/${agentId}`, { headers: expectedHeaders });
      expect(result).toEqual(mockAgent);
    });

    it('should return null if agent not found (404)', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 404 });
      const result = await agentService.getItemById(agentId);
      expect(result).toBeNull();
    });

    it('should throw an error and log on API error (non-404)', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });
      await expect(agentService.getItemById(agentId)).rejects.toThrow('HTTP error! status: 500');
      expect(console.error).toHaveBeenCalledWith(`Error fetching agent by id ${agentId}:`, expect.any(Error));
    });
  });

  describe('getItemsByPageNumber', () => {
    const page = 1, pageSize = 2;
    it('should fetch agents by page (response with "agents" key)', async () => {
      const mockAgents = [{ id: 'ap1', name: 'Paged Agent 1' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ agents: mockAgents, total: 3 }),
      });
      const result = await agentService.getItemsByPageNumber(page, pageSize);
      expect(fetch).toHaveBeenCalledWith(`${MOCK_API_BASE_URL_AGENTS}?page=${page}&size=${pageSize}`, { headers: expectedHeaders });
      expect(result).toEqual({ items: mockAgents, total: 3 });
    });

    it('should fetch agents by page (response with "items" key)', async () => {
      const mockAgents = [{ id: 'ap2', name: 'Paged Agent 2' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: mockAgents, total: 3 }),
      });
      const result = await agentService.getItemsByPageNumber(page, pageSize);
      expect(result).toEqual({ items: mockAgents, total: 3 });
    });

    it('should fetch agents by page (response is direct array)', async () => {
      const mockAgents = [{ id: 'ap3', name: 'Paged Agent 3' }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockAgents, // Direct array
      });
      const result = await agentService.getItemsByPageNumber(page, pageSize);
      expect(result).toEqual({ items: mockAgents, total: 0 }); // Total defaults to 0
    });

    it('should return empty items and total 0 for unexpected structure', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [], count: 0 }),
      });
      const result = await agentService.getItemsByPageNumber(page, pageSize);
      expect(result).toEqual({ items: [], total: 0 });
    });

    it('should throw an error and log on API error', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });
      await expect(agentService.getItemsByPageNumber(page, pageSize)).rejects.toThrow('HTTP error! status: 500');
      expect(console.error).toHaveBeenCalledWith(`Error fetching agents for page ${page}:`, expect.any(Error));
    });
  });

  describe('Mutation Placeholders', () => {
    const testData = { name: 'Test Agent' };
    it('addItem should reject as not implemented', async () => {
      await expect(agentService.addItem(testData)).rejects.toEqual("addItem (agent) not implemented");
    });
    it('updateItem should reject as not implemented', async () => {
      await expect(agentService.updateItem(testData)).rejects.toEqual("updateItem (agent) not implemented");
    });
    it('deleteItemById should reject as not implemented', async () => {
      await expect(agentService.deleteItemById('id1')).rejects.toEqual("deleteItemById (agent) not implemented");
    });
  });
});
