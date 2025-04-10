interface QueryParams {
  [key: string]: string | number | boolean | undefined
}
export function generateQueryParams(params: QueryParams): string {
  let result = "?"
  const paramsArray = Object.entries(params)
  for (let i = 0; i < paramsArray.length; i++) {
    const [key, value] = paramsArray[i]
    if (
      key &&
      value !== undefined &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      result += `${key}=${encodeURIComponent(value)}`
      if (i < paramsArray.length - 1) {
        result += "&"
      }
    }
  }
  return result
}
