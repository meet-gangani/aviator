import axios from './gAxios'

export default class WithdrawsService {
  static async getWithdraws() {
    try {
      const response = await axios.get('/v1/withdraws')

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  static async updateWithdrawsId(withdrawsId, data) {
    try {
      const response = await axios.get(`/v1/withdraws/${withdrawsId}`, data)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}