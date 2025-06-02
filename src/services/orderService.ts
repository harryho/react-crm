// TODO: Define a proper interface for Order items
type TODO = any;

const API_BASE_URL_ORDERS = "http://16.171.228.168:5000/api/orders";
const AUTH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjdHOEp0amo4bXF0WlF2djkifQ.eyJhdWQiOiJodHRwczovL2FwaS5kZWxpdmVyZWN0LmNvbSIsImV4cCI6MTc0NzI5Mjg4MiwiaWF0IjoxNzQ3MjA2NDgyLCJpc3MiOiJodHRwczovL2FwaS5kZWxpdmVyZWN0LmNvbSIsImF6cCI6ImN6RmNLWU9Nc3RpOUF3aDYiLCJzdWIiOiJjekZjS1lPTXN0aTlBd2g2QGNsaWVudHMiLCJzY29wZSI6InN0b3JlIGdlbmVyaWNQT1MifQ.XJNiA8unlkXA4EohTLs1o9LunasORsng1hiF3C02CLE6fRk77K-jAlMdOy_GTGWQHSC_fij7YBngfEMMSFPrZ8sl0rZyi502p0tEpE8kHfTt6D3ec7H7IjkXT_DPwrPTSnlCknvTR2eHR3fB2hIUSaRQ5r81cZA8ccS1DXRwdZlGlz7f38HLGloxRha9G8CtAIxAZj44RAzg0ITAliVNQHL5yLd1AxMoGhHA9D64gVLq9LxFQrhTjHkmxH8r_k_8iCYgDlRHV1HI3C_-mcDTOvCmbtqeemrkB76AQXCI0kv2yRs3aWPyUqd0APjfwa_uvR7Lt83E10I412ZJ0wlWxQ';

const headers = {
  'Authorization': `Bearer ${AUTH_TOKEN}`,
  'Content-Type': 'application/json'
};

export async function addItem(data: TODO) {
  // TODO: Implement POST request to /api/orders
  console.log("addItem (order) called with data:", data);
  // Example:
  // try {
  //   const response = await fetch(API_BASE_URL_ORDERS, {
  //     method: 'POST',
  //     headers,
  //     body: JSON.stringify(data),
  //   });
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error("Error adding order:", error);
  //   throw error;
  // }
  return Promise.reject("addItem (order) not implemented");
}

export async function updateItem(data: TODO) {
  // TODO: Implement PUT request to /api/orders/{id}
  console.log("updateItem (order) called with data:", data);
  // Example:
  // try {
  //   const response = await fetch(`${API_BASE_URL_ORDERS}/${data.id}`, {
  //     method: 'PUT',
  //     headers,
  //     body: JSON.stringify(data),
  //   });
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error("Error updating order:", error);
  //   throw error;
  // }
  return Promise.reject("updateItem (order) not implemented");
}

export async function getAllItems() {
  try {
    const response = await fetch(API_BASE_URL_ORDERS, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Assuming API returns { orders: [...] } or { items: [...] } or just [...]
    // This will be verified, and adjusted if necessary.
    if (data && data.orders && Array.isArray(data.orders)) {
        return data.orders;
    }
    if (data && data.items && Array.isArray(data.items)) {
        return data.items;
    }
    if (Array.isArray(data)) {
        return data;
    }
    return []; // Default to empty array if structure is not as expected
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
}

export async function getItemById(id: string | number) {
  try {
    const response = await fetch(`${API_BASE_URL_ORDERS}/${id}`, { headers });
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Assuming API returns a single order object
  } catch (error) {
    console.error(`Error fetching order by id ${id}:`, error);
    throw error;
  }
}

export async function deleteItemById(id: string | number) {
  // TODO: Implement DELETE request to /api/orders/{id}
  console.log("deleteItemById (order) called with id:", id);
  // Example:
  // try {
  //   const response = await fetch(`${API_BASE_URL_ORDERS}/${id}`, {
  //     method: 'DELETE',
  //     headers,
  //   });
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   return;
  // } catch (error) {
  //   console.error("Error deleting order:", error);
  //   throw error;
  // }
  return Promise.reject("deleteItemById (order) not implemented");
}

export async function getItemsByPageNumber(
  pageNumber: number, pageSize: number = 10
) {
  try {
    const response = await fetch(`${API_BASE_URL_ORDERS}?page=${pageNumber}&size=${pageSize}`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Assuming API returns { orders: [...] } or { items: [...] } or just [...] for the page
    // This will be verified, and adjusted if necessary.
    if (data && data.orders && Array.isArray(data.orders)) {
        return data.orders;
    }
    if (data && data.items && Array.isArray(data.items)) {
        return data.items;
    }
    if (Array.isArray(data)) {
        return data;
    }
    return []; // Default to empty array
  } catch (error) {
    console.error(`Error fetching orders for page ${pageNumber}:`, error);
    throw error;
  }
}