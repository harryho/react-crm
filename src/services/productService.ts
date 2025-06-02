// TODO: Define a proper interface for Product items
type TODO = any;

const API_BASE_URL = "http://16.171.228.168:5000/api";
const AUTH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjdHOEp0amo4bXF0WlF2djkifQ.eyJhdWQiOiJodHRwczovL2FwaS5kZWxpdmVyZWN0LmNvbSIsImV4cCI6MTc0NzI5Mjg4MiwiaWF0IjoxNzQ3MjA2NDgyLCJpc3MiOiJodHRwczovL2FwaS5kZWxpdmVyZWN0LmNvbSIsImF6cCI6ImN6RmNLWU9Nc3RpOUF3aDYiLCJzdWIiOiJjekZjS1lPTXN0aTlBd2g2QGNsaWVudHMiLCJzY29wZSI6InN0b3JlIGdlbmVyaWNQT1MifQ.XJNiA8unlkXA4EohTLs1o9LunasORsng1hiF3C02CLE6fRk77K-jAlMdOy_GTGWQHSC_fij7YBngfEMMSFPrZ8sl0rZyi502p0tEpE8kHfTt6D3ec7H7IjkXT_DPwrPTSnlCknvTR2eHR3fB2hIUSaRQ5r81cZA8ccS1DXRwdZlGlz7f38HLGloxRha9G8CtAIxAZj44RAzg0ITAliVNQHL5yLd1AxMoGhHA9D64gVLq9LxFQrhTjHkmxH8r_k_8iCYgDlRHV1HI3C_-mcDTOvCmbtqeemrkB76AQXCI0kv2yRs3aWPyUqd0APjfwa_uvR7Lt83E10I412ZJ0wlWxQ';

const headers = {
  'Authorization': `Bearer ${AUTH_TOKEN}`,
  'Content-Type': 'application/json'
};

export async function addItem(data: TODO) {
  // TODO: Implement POST request to /api/items
  console.log("addItem called with data:", data);
  // Example:
  // try {
  //   const response = await fetch(`${API_BASE_URL}/items`, {
  //     method: 'POST',
  //     headers,
  //     body: JSON.stringify(data),
  //   });
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error("Error adding item:", error);
  //   throw error;
  // }
  return Promise.reject("addItem not implemented");
}

export async function updateItem(data: TODO) {
  // TODO: Implement PUT request to /api/items/{id}
  console.log("updateItem called with data:", data);
  // Example:
  // try {
  //   const response = await fetch(`${API_BASE_URL}/items/${data.id}`, {
  //     method: 'PUT',
  //     headers,
  //     body: JSON.stringify(data),
  //   });
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error("Error updating item:", error);
  //   throw error;
  // }
  return Promise.reject("updateItem not implemented");
}

export async function getAllItems() {
  try {
    const response = await fetch(`${API_BASE_URL}/items`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // The API returns {"items": [...], "total": N}, so we return data.items
    return data.items || []; // Return empty array if items is not present
  } catch (error) {
    console.error("Error fetching all items:", error);
    throw error;
  }
}

export async function getItemById(id: string | number) {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, { headers });
    if (!response.ok) {
      if (response.status === 404) {
        return null; // Or handle as per application's requirement for not found
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Assuming the API returns a single item
  } catch (error) {
    console.error(`Error fetching item by id ${id}:`, error);
    throw error;
  }
}

export async function deleteItemById(id: string | number) {
  // TODO: Implement DELETE request to /api/items/{id}
  console.log("deleteItemById called with id:", id);
  // Example:
  // try {
  //   const response = await fetch(`${API_BASE_URL}/items/${id}`, {
  //     method: 'DELETE',
  //     headers,
  //   });
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   // DELETE typically returns 204 No Content or the deleted item
  //   return; // Or handle response as needed
  // } catch (error) {
  //   console.error("Error deleting item:", error);
  //   throw error;
  // }
  return Promise.reject("deleteItemById not implemented");
}

export async function getItemsByPageNumber(
  pageNumber: number, pageSize: number = 10
) {
  try {
    // Adjust query parameters based on actual API specification if different
    const response = await fetch(`${API_BASE_URL}/items?page=${pageNumber}&size=${pageSize}`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Assuming the API returns a structure like { items: [], totalPages: X, currentPage: Y }
    // or just an array of items for that page.
    // The original function returned products.slice(start, end); so an array is expected.
    // The API structure for paginated items could be {"items": [...], "meta": {...}} or similar.
    // We need to return an array of items.
    // Expects API to return an object like: { items: Product[], total: number, page?: number, pageSize?: number }
    // Or possibly { products: Product[], total: number, ... }
    const items = (data && data.items && Array.isArray(data.items)) ? data.items :
                  (data && data.products && Array.isArray(data.products)) ? data.products :
                  Array.isArray(data) ? data : [];

    const total = (data && typeof data.total === 'number') ? data.total : 0;

    return { items, total };
  } catch (error) {
    console.error(`Error fetching items for page ${pageNumber}:`, error);
    throw error;
  }
}