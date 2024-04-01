import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { url, method, data } = req.body

  const options = {
    method,
    body: JSON.stringify(data)
  }

  // Remove body from options if method is GET or HEAD
  if (method.toLowerCase() === "get" || method.toLowerCase() === "head") {
    delete options.body
  }

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      res.send({ data })
    })
    .catch((error) => {
      res.send({ error })
    })
}

export default handler
