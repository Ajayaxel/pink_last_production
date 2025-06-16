// // apiService.js - Global API service for handling all API calls

// const API_CONFIG = {
//     baseURL: 'http://localhost:7000/api/',
//     timeout: 10000, // 10 seconds timeout
//   };
  
//   class ApiService {
//     constructor(config = API_CONFIG) {
//       this.baseURL = config.baseURL;
//       this.timeout = config.timeout;
//     }
  
//     // Generic GET request method
//     async get(endpoint, options = {}) {
//       try {
//         const controller = new AbortController();
//         const timeoutId = setTimeout(() => controller.abort(), this.timeout);
  
//         const response = await fetch(`${this.baseURL}${endpoint}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             ...options.headers,
//           },
//           signal: controller.signal,
//           ...options,
//         });
  
//         clearTimeout(timeoutId);
  
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
//         }
  
//         const data = await response.json();
//         return data;
//       } catch (error) {
//         if (error.name === 'AbortError') {
//           throw new Error('Request timeout');
//         }
//         console.error('API GET Error:', error);
//         throw error;
//       }
//     }
  
//     // Generic POST request method
//     async post(endpoint, body = {}, options = {}) {
//       try {
//         const controller = new AbortController();
//         const timeoutId = setTimeout(() => controller.abort(), this.timeout);
  
//         const response = await fetch(`${this.baseURL}${endpoint}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             ...options.headers,
//           },
//           body: JSON.stringify(body),
//           signal: controller.signal,
//           ...options,
//         });
  
//         clearTimeout(timeoutId);
  
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
//         }
  
//         const data = await response.json();
//         return data;
//       } catch (error) {
//         if (error.name === 'AbortError') {
//           throw new Error('Request timeout');
//         }
//         console.error('API POST Error:', error);
//         throw error;
//       }
//     }
  
//     // Generic PUT request method
//     async put(endpoint, body = {}, options = {}) {
//       try {
//         const controller = new AbortController();
//         const timeoutId = setTimeout(() => controller.abort(), this.timeout);
  
//         const response = await fetch(`${this.baseURL}${endpoint}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             ...options.headers,
//           },
//           body: JSON.stringify(body),
//           signal: controller.signal,
//           ...options,
//         });
  
//         clearTimeout(timeoutId);
  
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
//         }
  
//         const data = await response.json();
//         return data;
//       } catch (error) {
//         if (error.name === 'AbortError') {
//           throw new Error('Request timeout');
//         }
//         console.error('API PUT Error:', error);
//         throw error;
//       }
//     }
  
//     // Generic DELETE request method
//     async delete(endpoint, options = {}) {
//       try {
//         const controller = new AbortController();
//         const timeoutId = setTimeout(() => controller.abort(), this.timeout);
  
//         const response = await fetch(`${this.baseURL}${endpoint}`, {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//             ...options.headers,
//           },
//           signal: controller.signal,
//           ...options,
//         });
  
//         clearTimeout(timeoutId);
  
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
//         }
  
//         const data = await response.json();
//         return data;
//       } catch (error) {
//         if (error.name === 'AbortError') {
//           throw new Error('Request timeout');
//         }
//         console.error('API DELETE Error:', error);
//         throw error;
//       }
//     }
//   }
  
//   // Create a singleton instance
//   const apiService = new ApiService();
  
//   // Export the instance for use across the application
//   export default apiService;
  
//   // Named exports for specific use cases
//   export { ApiService, API_CONFIG };




import axios from 'axios';

// Create an Axios instance with a base URL

export const BASE_URL = "https://backend.pinkstories.ae/api/";

const api = axios.create({
    baseURL: BASE_URL, // Change this if your API base changes
    headers: {
        'Content-Type': 'application/json',
    },
});

// You can also add interceptors here (e.g., for auth tokens or logging)

export default api;





