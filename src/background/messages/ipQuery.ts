import type { PlasmoMessaging } from "@plasmohq/messaging"

/**
 * To create message handlers, define a handler function and export it.
 * Each message handler should be its own .ts file and goes by the name of the file.
 * @param req Request object sent to this handler
 * @param res Resposne sent back to caller
 */
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {

  const message = fetch("https://api.ipify.org/?" + new URLSearchParams({
    format: 'json'
  }))
  .then((resp) => {
    return resp.json()
  })
  .then((data) => {
    res.send({ data })
  })
}

export default handler