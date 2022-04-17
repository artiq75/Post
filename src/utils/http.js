export class Http {
  static BASE_URL = 'https://jsonplaceholder.typicode.com'

  static async http(endpoint, params = {}) {
    const url = `${this.BASE_URL}${endpoint}`
    const response = await fetch(url, params)
    if (response.ok) {
      return await response.json()
    }
    throw new Error(`${response.status} ${response.statusText}`)
  }

  static async get(endpoint) {
    return await this.http(endpoint)
  }

  static async post(endpoint, body) {
    body = JSON.stringify(body)
    return await this.http(endpoint, {
      method: 'POST',
      body,
      headers: {
        'Content-type': 'application/json',
      },
    })
  }

  static async put(endpoint, body) {
    body = JSON.stringify(body)
    return await this.http(endpoint, {
      method: 'PUT',
      body,
      headers: {
        'Content-type': 'application/json',
      },
    })
  }

  static async delete(endpoint) {
    return await this.http(endpoint, {
      method: 'DELETE',
    })
  }
}
