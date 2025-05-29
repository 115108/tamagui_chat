import { useEffect, useRef, useState } from 'react'
import { ChatMessage } from 'type/chat'


export function useChatSocket(userId: string,) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/chat/ws/chat') // 注意替换为你服务器的地址
    socketRef.current = socket

    socket.onopen = () => {
      console.log('✅ WebSocket 已连接')
    }

    socket.onmessage = (event) => {
      const msg: ChatMessage = JSON.parse(event.data)
      setMessages((prev) => [...prev, msg])
    }

    socket.onclose = () => {
      console.log('❌ WebSocket 已关闭')
    }

    return () => {
      socket.close()
    }
  }, [])
  const addHistoryMessage = (msgs: ChatMessage[]) => {
    setMessages(msgs)
  }

  const sendNewMessage = (text: string) => {
  if (!text.trim() || !socketRef.current) return

  const socket = socketRef.current
  if (socket.readyState !== WebSocket.OPEN) return

  const msg: ChatMessage = {
    sender_id: userId,
    content: text,
    timestamp: new Date().toISOString(),
    type: 'text',
  }

  socket.send(JSON.stringify(msg))
  setMessages((prev) => [...prev, msg])
}


  return { messages, sendNewMessage,addHistoryMessage}
}
