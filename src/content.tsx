import cssText from "data-text:~style.css"
import { useEffect, useState } from "react"
// import type { PlasmoCSConfig } from "plasmo"

// This is what limits content-injection to specific pages
// Do this for all content-scripts.
// export const config: PlasmoCSConfig = {
//   matches: ["https://www.plasmo.com/*"]
// }

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [wikiTldr, setWikiTldr] = useState(null)
  useEffect(() => {
    chrome.runtime.onMessage.addListener(({ type, text }) => {
      if (type == "wiki-query") {
        setWikiTldr(text)
      }
      return true
    })
  }, [])
  
  return (
    <div>
      <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Wikipedia TLDR
        </h1>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
          {wikiTldr?.title}
        </h2>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {wikiTldr?.description}
        </p>
      </div>
    </div>
  )
}

export default PlasmoOverlay
