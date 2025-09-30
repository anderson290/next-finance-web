import axios from 'axios';

class CurrencyRepository {
  static async getAllCurrenciesComparedToBRL() {
    try {
      const url = 'https://api.exchangerate.host/latest?base=BRL';
      const response = await axios.get(url);
      return response.data;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to fetch currency data');
    }
  }
}

export default CurrencyRepository;