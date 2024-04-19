import axios from 'axios';

const API_KEY = '43399505-93fd90124b6ff62a7ea4f0cc3';

export async function fetchImage(query, perPage, page) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}`,
      {
        params: {
          q: query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          per_page: perPage,
          page: page,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch images');
    }

    return {
      totalHits: response.data.totalHits,
      hits: response.data.hits,
    };
  } catch (error) {
    console.error('Error searching images:', error.message);
    return [];
  }
}
