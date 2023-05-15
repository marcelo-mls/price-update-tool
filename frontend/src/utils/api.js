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

export async function updateProducts(payload) {
  try {
    const response = await API.patch('products/', payload);
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`${error.name}: ${error.message}`);
  }
}
