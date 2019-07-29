import fetch from './request'

export function createAction(options) {
  const { url, data, params, method, fetchOptions, cb, type } = options
  return (dispatch) => {
    return request({ url, data, params, method, ...fetchOptions }).then((res) => {
      dispatch({ type, payload: cb ? cb(res) : res })
      return res
    })
  }
}
