// import { schema, normalize } from 'normalizr'
// import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

// const API_ROOT = 'https://api.github.com/'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint) {
  // const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  const fullUrl = endpoint
  return fetch(fullUrl)
    .then(response => {
      let res = response.json().then(json => ({ json, response }))
      return res
    }).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return Object.assign({},
        json
      )
    })
    .then(
    response => ({ response }),
    error => ({ error: error.message || 'Something bad happened' })
    )

}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

// Schemas for Github API responses.
// const userSchema = new schema.Entity('users')
// const repoSchema = new Schema('repos', {
//   idAttribute: 'fullName'
// })

// repoSchema.define({
//   owner: userSchema
// })

// const userSchemaArray = arrayOf(userSchema)
// const repoSchemaArray = arrayOf(repoSchema)

// api services
// export const fetchUser = login => {
//   return callApi('./static/mock/login.json', userSchema)
// }
export const fetchUser = login => {
  return callApi('./static/mock/login.json')
}
