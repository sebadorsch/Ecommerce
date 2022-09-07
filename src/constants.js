const {
  AUTH_API
} = process.env

const apiAuth = AUTH_API || 'http://127.0.0.1:8000/auth'

export const Constants = {
  apiAuth: `${apiAuth}`,
}