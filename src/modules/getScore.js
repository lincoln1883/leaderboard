import url from './api.js';

const getScore = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.result;
  } catch (error) {
    return error.message || 'Something went wrong';
  }
};

export default getScore;
