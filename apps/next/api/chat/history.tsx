import { ChatMessage } from "type/chat"
import api from "../api"

export async function getHistory() {
  try {
    const res = await api.get('chat/history')
    const data = res.data

    if (Array.isArray(data) && data.every(item => typeof item === 'object' && item.content)) {
      return data as ChatMessage[]
    } else {
      console.warn("⚠️ 返回的数据结构不符合 ChatMessage[]")
      return []
    }
  } catch (error) {
    console.error("❌ 获取历史消息失败:", error)
    return []
  }

  
}