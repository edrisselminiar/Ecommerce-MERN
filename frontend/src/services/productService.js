import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/products';

export const fetchLandingPageProducts = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/landing/${category.toLowerCase()}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${category} products:`, error);
    throw error;
  }
};