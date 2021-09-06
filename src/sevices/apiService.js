import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

const fetchItem = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/item/${id}.json`);
  return data;
};

const fetchNews = async () => {
  const { data } = await axios.get(`${BASE_URL}/newstories.json`);
  return data;
};

const apiService = { fetchItem, fetchNews };

export default apiService;
