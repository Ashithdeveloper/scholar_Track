import axios from 'axios'

const BASE = "https://scholar-zceo.onrender.com"

function normalizeError(err) {
  if (!err) return 'Unknown error'
  if (err.response && err.response.data) {
    const data = err.response.data
    if (typeof data === 'string') return data
    if (data.message) return data.message
    return JSON.stringify(data)
  }
  if (err.message) return err.message
  return String(err)
}

export async function apiPost(path, body, opts = {}) {
  try {
    const url = path.startsWith('http') ? path : `${BASE}${path}`
    const res = await axios.post(url, body, { headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) }, ...opts })
    return res.data
  } catch (err) {
    const message = normalizeError(err)
    const e = new Error(message)
    e.original = err
    throw e
  }
}

export async function apiGet(path, opts = {}) {
  try {
    const url = path.startsWith('http') ? path : `${BASE}${path}`
    const res = await axios.get(url, opts)
    return res.data
  } catch (err) {
    const message = normalizeError(err)
    const e = new Error(message)
    e.original = err
    throw e
  }
}

export default { apiPost, apiGet }
