import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { type FetchMethod } from "../types/FetchMethod"

type Query<T> = (
  url: string,
  method?: FetchMethod,
  data?: object,
  headers?: Headers
) => T

type FetchResponse = [
  getData: () => void,
  {
    response: Response | null
    error: Error | null
    isLoading: boolean
  }
]

const useMessenger: Query<FetchResponse> = (
  url: string,
  method: FetchMethod = "get",
  data: object = {}
) => {
  const [response, setResponse] = useState<Response | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // if url does not start with a slash, append it
  if (!url.startsWith("/")) {
    url = `/${url}`
  }

  const apiUrl = "http://127.0.0.1:8000/api"

  const getData = () => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response: Response = await sendToBackground({
          name: "fetch",
          body: {
            url: apiUrl + url,
            method,
            data
          }
        })

        console.log({ response })

        setResponse(response)
      } catch (err: unknown | Error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }

  return [getData, { response, error, isLoading }] as FetchResponse
}

export default useMessenger
