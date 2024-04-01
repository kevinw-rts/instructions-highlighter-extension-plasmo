import { useEffect, useState } from "react"

import { type FetchMethod } from "../types/FetchMethod"

type Query<T> = (
  url: string,
  method?: FetchMethod,
  data?: object,
  headers?: Headers
) => T

type FetchResponse = {
  response: Response | null
  error: Error | null
  isLoading: boolean
}

const useFetch: Query<FetchResponse> = (
  url: string,
  method: FetchMethod = "get",
  data: object = {},
  headers: Headers = new Headers()
) => {
  const [response, setResponse] = useState<Response | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // if url does not start with a slash, append it
  if (!url.startsWith("/")) {
    url = `/${url}`
  }

  useEffect(() => {
    setIsLoading(true)

    const fetchData = async () => {
      try {
        const response: Response = await fetch(url, {
          method,
          body: JSON.stringify(data),
          headers
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
  }, [])

  return { response, error, isLoading } as FetchResponse
}

export default useFetch
