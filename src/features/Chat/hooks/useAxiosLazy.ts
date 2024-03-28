import axios, { AxiosError, type AxiosResponse } from 'axios'
import { useState } from 'react'
import { type FetchMethod } from '../types/FetchMethod'
import { sendToBackground } from "@plasmohq/messaging"

axios.defaults.baseURL = "https://api.ipify.org/" as string

console.log({ baseURL: axios.defaults.baseURL })

type Query<T> = (endpoint: string, method?: FetchMethod, data?: object) => T
type Response = [getData: () => void, { response: AxiosResponse | null; error: AxiosError | null; isLoading: boolean }]

const useAxiosLazy: Query<Response> = (endpoint: string, method: FetchMethod = 'get', data: object = {}) => {
  const [response, setResponse] = useState<Error | AxiosResponse | null>(null)
  const [error, setError] = useState<AxiosError | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // if endpoint does not start with a slash, append it
  if (!endpoint.startsWith('/')) {
    endpoint = `/${endpoint}`
  }

  const getData = () => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response: AxiosResponse = await sendToBackground({
          name: 'ipQuery'
        })

        setResponse(response)
      } catch (err: unknown | AxiosError | Error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }

  return [getData, { response, error, isLoading }] as Response
}

export default useAxiosLazy
