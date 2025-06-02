// TODO: Define a proper interface for Agent items
type TODO = any;

// Static role array as per requirement
export const roleArray = () => [
  { id: "1", title: 'Sales Leader' },
  { id: "2", title: 'Hr Manager' },
  { id: "3", title: 'Sales Agent' },
  { id: "4", title: 'Sales Operator' },
  { id: "5", title: 'Sales Manager' },
  { id: "6", title: 'Project Manager' },
  { id: "7", title: 'Business Analyst' },
  { id: "9", title: 'Product Designer' },
  { id: "10", title: 'Market Manager' },
  { id: "11", title: 'General Manager' }
];

const API_BASE_URL_AGENTS = "http://16.171.228.168:5000/api/agents";
const AUTH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjdHOEp0amo4bXF0WlF2djkifQ.eyJhdWQiOiJodHRwczovL2FwaS5kZWxpdmVyZWN0LmNvbSIsImV4cCI6MTc0NzI5Mjg4MiwiaWF0IjoxNzQ3MjA2NDgyLCJpc3MiOiJodHRwczovL2FwaS5kZWxpdmVyZWN0LmNvbSIsImF6cCI6ImN6RmNLWU9Nc3RpOUF3aDYiLCJzdWIiOiJjekZjS1lPTXN0aTlBd2g2QGNsaWVudHMiLCJzY29wZSI6InN0b3JlIGdlbmVyaWNQT1MifQ.XJNiA8unlkXA4EohTLs1o9LunasORsng1hiF3C02CLE6fRk77K-jAlMdOy_GTGWQHSC_fij7YBngfEMMSFPrZ8sl0rZyi502p0tEpE8kHfTt6D3ec7H7IjkXT_DPwrPTSnlCknvTR2eHR3fB2hIUSaRQ5r81cZA8ccS1DXRwdZlGlz7f38HLGloxRha9G8CtAIxAZj44RAzg0ITAliVNQHL5yLd1AxMoGhHA9D64gVLq9LxFQrhTjHkmxH8r_k_8iCYgDlRHV1HI3C_-mcDTOvCmbtqeemrkB76AQXCI0kv2yRs3aWPyUqd0APjfwa_uvR7Lt83E10I412ZJ0wlWxQ';

const headers = {
  'Authorization': `Bearer ${AUTH_TOKEN}`,
  'Content-Type': 'application/json'
};

export async function addItem(data: TODO) {
  // TODO: Implement POST request to /api/agents
  console.log("addItem (agent) called with data:", data);
  // Example:
  // try {
  //   const response = await fetch(API_BASE_URL_AGENTS, {
  //     method: 'POST',
  //     headers,
  //     body: JSON.stringify(data),
  //   });
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error("Error adding agent:", error);
  //   throw error;
  // }
  return Promise.reject("addItem (agent) not implemented");
}

export async function updateItem(data: TODO) {
  // TODO: Implement PUT request to /api/agents/{id}
  console.log("updateItem (agent) called with data:", data);
  // Example:
  // try {
  //   const response = await fetch(`${API_BASE_URL_AGENTS}/${data.id}`, {
  //     method: 'PUT',
  //     headers,
  //     body: JSON.stringify(data),
  //   });
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error("Error updating agent:", error);
  //   throw error;
  // }
  return Promise.reject("updateItem (agent) not implemented");
}

export async function getAllItems() {
  try {
    const response = await fetch(API_BASE_URL_AGENTS, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Assuming API returns { agents: [...] } or { items: [...] } or just [...]
    if (data && data.agents && Array.isArray(data.agents)) {
        return data.agents;
    }
    if (data && data.items && Array.isArray(data.items)) {
        return data.items;
    }
    if (Array.isArray(data)) {
        return data;
    }
    return []; // Default to empty array
  } catch (error) {
    console.error("Error fetching all agents:", error);
    throw error;
  }
}

export async function getItemById(id: string | number) {
  try {
    const response = await fetch(`${API_BASE_URL_AGENTS}/${id}`, { headers });
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Assuming API returns a single agent object
  } catch (error) {
    console.error(`Error fetching agent by id ${id}:`, error);
    throw error;
  }
}

export async function deleteItemById(id: string | number) {
  // TODO: Implement DELETE request to /api/agents/{id}
  console.log("deleteItemById (agent) called with id:", id);
  // Example:
  // try {
  //   const response = await fetch(`${API_BASE_URL_AGENTS}/${id}`, {
  //     method: 'DELETE',
  //     headers,
  //   });
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   return;
  // } catch (error) {
  //   console.error("Error deleting agent:", error);
  //   throw error;
  // }
  return Promise.reject("deleteItemById (agent) not implemented");
}

export async function getItemsByPageNumber(
  pageNumber: number, pageSize: number = 10
) {
  try {
    const response = await fetch(`${API_BASE_URL_AGENTS}?page=${pageNumber}&size=${pageSize}`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Assuming API returns { agents: [...] } or { items: [...] } or just [...] for the page
    if (data && data.agents && Array.isArray(data.agents)) {
        return data.agents;
    }
    if (data && data.items && Array.isArray(data.items)) {
        return data.items;
    }
    if (Array.isArray(data)) {
        return data;
    }
    return []; // Default to empty array
  } catch (error) {
    console.error(`Error fetching agents for page ${pageNumber}:`, error);
    throw error;
  }
}