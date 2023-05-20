import API from './axios';
import toast from 'react-hot-toast';
import { tableMock } from './table.mock';


export async function fetchAndValidateProducts(payload) {
  return tableMock
  // try {
  //   const response = await API.post('products/', payload);
  //   return response;
  // } catch (error) {
  //   toast.error('Ops! Algo deu errado.')
  //   console.error(`${error.name}: ${error.message}`);
  //   return [];
  // }
}

export async function updateProducts(payload) {
  try {
    const response = await API.patch('products/', payload);
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`${error.name}: ${error.message}`);
    toast.error('Ops! Algo deu errado.')
  }
}
