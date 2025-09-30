import CurrencyRepository from '../repositories/currency.repository';

class CurrencyService {
  static async getAllCurrenciesComparedToBRL() {
    return await CurrencyRepository.getAllCurrenciesComparedToBRL();
  }
}

export default CurrencyService;