import axios from 'axios';

export const getInvestimentosBB = async (accessToken: string) => {
  const response = await axios.get('URL_API_BB', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};