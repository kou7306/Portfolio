import axios from 'axios';

const qiita = process.env.QIITA_TOKEN;

const qiitaClient = axios.create({
  baseURL: 'https://qiita.com/api/v2',
  headers: {
    Authorization: `Bearer ${qiita}`
  }
});

export const getQiitaItems = async () => {
  try {
    const response = await qiitaClient.get('/items');
    return response.data;
  } catch (error) {
    console.error('Error fetching Qiita items:', error);
    throw error;
  }
};