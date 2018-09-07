const POST = "POST"
const PUT = "PUT"
const GET = "GET"

const toJson = (x) => x.json()

const request = (method, url, body, contentType="application/json") => {
    const options = {
        method: method,
        headers: {
            "Content-Type": contentType,
            "Accept": "application/json"
        }
    }
    if (body) options.body = JSON.stringify(body)
    return fetch(url, options)
        .then(toJson)
}

export const post = (url, body) => {
    return request(POST, url, body)
}

export const postMultiPart = (url, body) => {
    return request(POST, url, body, "multipart/form-data")
}


export const put = (url, body) => {
    return request(PUT, url, body)
}

export const get = (url) => {
    return request(GET, url)
}
