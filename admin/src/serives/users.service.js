import axios from './gAxios'

export default class UsersService {
  static async getUsers() {
    try {
      const response = await axios.get('/v1/users')

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  static async updateUsers(userId, data) {
    try {
      const response = await axios.put(`/v1/users/${userId}`, data)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteUserById(userId) {
    try {
      await axios.delete(`/v1/users/${userId}`)
    } catch (error) {
      console.log(error)
    }
  }
}