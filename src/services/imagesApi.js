import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '39874664-ed75082f01d8e06abe2f74d77';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImage = async (query, page) => {
  const fetchImages = await axios.get(`?q=${query}&page=${page}`);
  return fetchImages.data;
};
