import cssText from "data-text:~chat.css"
import React from "react"
import Chat from "~/features/Chat/Chat"
import type { PlasmoCSConfig } from "plasmo"

// This is what limits content-injection to specific pages
// Do this for all content-scripts.
// export const config: PlasmoCSConfig = {
//   matches: ["https://en.wikipedia.org/*"]
// }

// This hook is used to import the chosen styles
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const ChatSidebar = () => {
  
  return (
    <Chat/>
  )
  
}

export default ChatSidebar
