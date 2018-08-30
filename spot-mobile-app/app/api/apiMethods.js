const POST = "POST"
const PUT = "PUT"
const GET = "GET"

const toJson = (x) => x.json()

const request = (method, url, body) => {
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
        }
    }
    if (body) options.body = JSON.stringify(body)
    return fetch(url, options)
        .then(toJson)
}

export const post = (url, body) => {
    return request(POST, url, body)
}

export const put = (url, body) => {
    return request(PUT, url, body)
}

export const get = (url) => {
    return request(GET, url)
}
