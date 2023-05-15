import API from './axios';

export async function fetchAndValidateProducts(payload) {
  try {
    const response = await API.post('products/', payload);
    return response;
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    return [];
  }
}