import { type UseQueryResult, queryOptions, useQuery } from '@tanstack/react-query'
import axios, { type AxiosResponse } from 'axios'
import { type FetchMethod } from '../types/FetchMethod'

type Query<T> = (queryKeys: Array<string> | string, endpoint: string, method?: FetchMethod) => T
const useApiQuery: Query<UseQueryResult> = (
  queryKeys: Array<string> | string,
  endpoint: string,
  method: FetchMethod = 'get'
) => {
  const options = queryOptions({
    queryKey: typeof queryKeys === 'string' ? [queryKeys] : queryKeys,
    queryFn: async () => {
      const response: AxiosResponse = await axios[method](`http://127.0.0.1:8000/api/${endpoint}`)

      if (response.status !== 200) {
        throw new Error('Network error')
      }

      return response.data
    },
  })

  return useQuery(options)
}

export default useApiQuery
