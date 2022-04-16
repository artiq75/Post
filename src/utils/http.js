export class Http {
  static BASE_URL = 'https://jsonplaceholder.typicode.com'

  static async http(endpoint) {
    const response = await fetch(`${this.BASE_URL}${endpoint}`)
    if (response.ok) {
      return await response.json()
    }
    throw new Error(`${response.status} ${response.statusText}`)
  }

  static async get(endpoint) {
    return await this.http(endpoint)
  }
}
