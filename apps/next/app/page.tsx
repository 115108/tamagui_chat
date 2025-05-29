'use client'

import { Layout, Input, Button, Row, Col, Card, Space } from 'antd'
import { getHistory } from 'api/chat/history'
import { useChatSocket } from 'api/chat/userChatSocket'
import { send } from 'process'
import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from 'type/chat'

const { Header, Footer, Content } = Layout

const myUserId = 'me123' 

export default function ChatPage() {
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendNewMessage,addHistoryMessage } = useChatSocket(myUserId)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history : ChatMessage[] = await getHistory()
        addHistoryMessage(history)
        console.log('历史消息加载完毕')
      } catch (err) {
        console.error('加载历史失败', err)
      }
    }

    fetchHistory()
  }, [])

  const handleSend = () => {
    if (!input.trim()) return
    sendNewMessage(input)
    setInput('')
  }

  // 滚动到底部
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ background: '#1677ff', color: 'white' }}>微信聊天</Header>

      <Content
        ref={scrollRef}
        style={{ padding: '16px', overflowY: 'auto', background: '#f5f5f5' }}
      >
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          {messages.map((msg, i) => {
            const isMe = msg.sender_id === myUserId
            return (
              <Row key={i} justify={isMe ? 'end' : 'start'}>
                <Col>
                  <Card
                    styles={{
                      body: {
                        background: isMe ? '#95ec69' : 'white',
                        borderRadius: 16,
                        maxWidth: 300
                      }
                    }}
                  >
                    {msg.content}
                  </Card>
                </Col>
              </Row>
            )
          })}
        </Space>
      </Content>

      <Footer style={{ padding: '12px 16px', background: '#fff' }}>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={handleSend}
            placeholder="输入消息..."
          />
          <Button type="primary" onClick={handleSend}>
            发送
          </Button>
        </Space.Compact>
      </Footer>
    </Layout>
  )
}
