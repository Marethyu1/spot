const POST = 'POST'
const PUT = 'PUT'
const GET = 'GET'

const toJson = x => x.json()

const request = (method, url, body, contentType = 'application/json') => {
  const options = {
    method,
    headers: {
      'Content-Type': contentType,
      Accept: 'application/json',
    },
  }
  if (body) options.body = JSON.stringify(body)
  return fetch(url, options)
    .then(toJson)
}

export const post = (url, body) => request(POST, url, body)


export const put = (url, body) => request(PUT, url, body)

export const get = url => request(GET, url)
