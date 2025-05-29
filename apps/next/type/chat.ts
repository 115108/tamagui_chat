export interface UserBase {
  username: string
  nickname?: string
  avatar?: string
}

export interface UserCreate extends UserBase {
  password: string
}

export interface UserInDB extends UserBase {
  id?: string
  created_at: string   // 后端是 datetime，前端一般用字符串表示
  status?: string      // "online" | "offline"
}

export interface Message {
  room_id: string
  sender_id: string
  content: string
  message_type?: string    // "text" | "image" | "file" | "emoji"
  timestamp: string        // ISO string, e.g. "2025-05-29T07:20:00Z"
  read_by?: string[]       // 已读成员 ID 列表
}

export interface Room {
  type: string             // "private" | "group"
  members: string[]        // 成员用户 ID
  created_at: string
  last_message?: string
}

export interface TokenData {
  user_id: string
  exp: string              // datetime string
}

export interface ChatMessage {
  sender_id: string
  content: string
  timestamp: string        // UTC string
  type: "text"
}
