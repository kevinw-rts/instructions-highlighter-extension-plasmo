import { type RefObject, useEffect, useRef, useState } from 'react'
import ChatInput from './components/ChatInput'
import ChatWindow from './components/ChatWindow'
import { type ChatMessage } from './types/ChatMessage'
import useAxiosLazy from './hooks/useAxiosLazy'
import ChatFab from './components/ChatFab'
import ChatHeader from './components/ChatHeader'
import useHighlighter from './hooks/useHighlighter'
import React from 'react'

const initialMessageState = {
  id: new Date().toISOString(),
  message: "Welcome to the Allen's Copilot. How can I help you?",
  user_id: 1,
  date: new Date().toDateString(),
  timestamp: new Date().toISOString(),
}

function Chat() {
  const [message, setMessage] = useState<ChatMessage | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([{ ...initialMessageState }])
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const [getData, { response, error, isLoading }] = useAxiosLazy(`?format=json`)
  const highlightElement = useHighlighter()

  /**
   * Handles the chat window closing when the user presses the escape key
   * @returns {void}
   */
  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (isChatOpen && document.activeElement === inputRef.current) {
          setIsChatOpen(false)
        }
      }
    })

    return () => {
      window.removeEventListener('keydown', () => { })
    }
  })

  /**
   * Handles a response
   * @returns {void}
   */
  useEffect(() => {
    if (!response) {
      return
    }

    setMessages((prevMessages: ChatMessage[]) => [
      ...prevMessages,
      {
        ...initialMessageState,
        id: new Date().toISOString(),
        message: response.data.ip,
        date: new Date().toDateString(),
        timestamp: new Date().toISOString(),
      },
    ])
    // highlightElement("Example_computer_program")
  }, [response])

  /**
   * Handles sending a request after receiving a new user message
   * @returns {void}
   */
  useEffect(() => {
    if (!message) {
      return
    }

    setMessages((prevMessages: ChatMessage[]) => [...prevMessages, message])
    getData()
  }, [message])

  /**
   * Handles submitting a new user message
   * @param {ChatMessage} message new user chat message
   * @returns {void}
   */
  function handleSubmit(message: ChatMessage) {
    setMessage(message)
  }

  /**
   * Handles toggling the chat window
   * @returns {void}
   */
  function handleToggleChat() {
    // Sets focus to the input when the chat is opened
    setIsChatOpen((prev) => {
      if (!prev) {
        inputRef.current!.focus()
      }

      return !prev
    })
  }

  if (error) {
    return <p>error</p>
  }

  return (
    <div id="chat-wrapper" className="flex flex-col w-full h-full">
      <div
        id="chat"
        className={`flex flex-col w-full h-full relative z-40 transition rounded-lg duration-300 shadow-xl bg-white
        ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}
      >
        <ChatHeader onClose={handleToggleChat} />
        <ChatWindow isLoading={isLoading && messages.length !== 1} messages={messages} />
        <ChatInput
          isLoading={isLoading && messages.length !== 1}
          onSubmit={handleSubmit}
          ref={inputRef as RefObject<HTMLInputElement>}
        />
      </div>
      <ChatFab isShown={!isChatOpen} onClick={handleToggleChat} />
    </div>
  )
}

export default Chat
