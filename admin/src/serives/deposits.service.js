import axios from './gAxios'

export default class DepositsService {
  static async getDeposits() {
    try {
      const response = await axios.get('/v1/deposits')

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  static async updateDeposits(depositsId, data) {
    try {
      const response = await axios.get(`/v1/deposits/${depositsId}`, data)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}