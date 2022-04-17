export class Http {
  static BASE_URL = 'https://jsonplaceholder.typicode.com'

  static async http(endpoint, params = {}) {
    const url = `${this.BASE_URL}${endpoint}`
    if (params.body) {
      params.body = JSON.stringify(params.body)
    }
    params = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      ...params,
    }
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
    return await this.http(endpoint, {
      method: 'POST',
      body,
    })
  }

  static async put(endpoint, body) {
    return await this.http(endpoint, {
      method: 'PUT',
      body,
    })
  }

  static async delete(endpoint) {
    return await this.http(endpoint, {
      method: 'DELETE',
    })
  }
}
