import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Badge, Text } from "@medusajs/ui"
import { useState, useEffect } from "react"

// Chat Dashboard Widget for Admin Panel
const ChatDashboardWidget = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [chats, setChats] = useState<any[]>([])
  const [selectedChat, setSelectedChat] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // ConnectyCube credentials from environment
  const CREDENTIALS = {
    appId: process.env.VITE_CHAT_APP_ID || 8879,
    authKey: process.env.VITE_CHAT_AUTH_KEY || '705BDF66-BB5B-48A8-8DC3-01827812BCBA',
  }

  const MERCHANT_USER = {
    login: 'merchant-cubitstore',
    password: 'MerchantSupport2024!',
  }

  // Initialize ConnectyCube chat
  const initializeChat = async () => {
    try {
      setLoading(true)
      setError("")
      
      // @ts-ignore - ConnectyCube is loaded globally
      if (typeof window !== 'undefined' && (window as any).ConnectyCube) {
        const ConnectyCube = (window as any).ConnectyCube
        
        console.log('🔧 Initializing ConnectyCube...')
        await ConnectyCube.init(CREDENTIALS)
        
        console.log('🔑 Creating session...')
        await ConnectyCube.createSession()
        
        console.log('👤 Logging in merchant...')
        const session = await ConnectyCube.login(MERCHANT_USER)
        
        console.log('📱 Connecting to chat...')
        await ConnectyCube.chat.connect({
          userId: session.user.id,
          password: MERCHANT_USER.password
        })
        
        setIsConnected(true)
        await loadChats()
        setupMessageListeners()
        
      } else {
        throw new Error('ConnectyCube SDK not loaded')
      }
    } catch (err: any) {
      setError(`Failed to initialize chat: ${err.message}`)
      console.error('Chat initialization error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Load all chats/conversations
  const loadChats = async () => {
    try {
      // @ts-ignore
      const ConnectyCube = window.ConnectyCube
      const response = await ConnectyCube.chat.dialog.list()
      const chatList = response.items || []
      
      // Filter for visitor chats (chats that are not from admin)
      const visitorChats = chatList.filter((chat: any) => 
        chat.name && (chat.name.includes('Visitor') || chat.name.includes('Customer'))
      )
      
      setChats(visitorChats)
      console.log('📋 Loaded visitor chats:', visitorChats)
    } catch (err: any) {
      console.error('Error loading chats:', err)
      setError(`Failed to load chats: ${err.message}`)
    }
  }

  // Setup real-time message listeners
  const setupMessageListeners = () => {
    // @ts-ignore
    const ConnectyCube = window.ConnectyCube
    
    ConnectyCube.chat.onMessageListener = (userId: number, message: any) => {
      console.log('📨 New message received:', message)
      
      // If it's for the selected chat, add it to messages
      if (selectedChat && message.dialog_id === selectedChat._id) {
        setMessages(prev => [...prev, message])
      }
      
      // Refresh chat list to show new message
      loadChats()
    }
  }

  // Load messages for selected chat
  const loadMessages = async (chatId: string) => {
    try {
      // @ts-ignore
      const ConnectyCube = window.ConnectyCube
      const response = await ConnectyCube.chat.message.list({
        chat_dialog_id: chatId
      })
      
      const messageList = response.items || []
      setMessages(messageList)
      console.log('💬 Loaded messages:', messageList)
    } catch (err: any) {
      console.error('Error loading messages:', err)
    }
  }

  // Send message to visitor
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return
    
    try {
      // @ts-ignore
      const ConnectyCube = window.ConnectyCube
      
      const messageParams = {
        type: 'chat',
        body: newMessage,
        extension: {
          save_to_history: 1,
          dialog_id: selectedChat._id
        }
      }
      
      await ConnectyCube.chat.send(selectedChat.xmpp_room_jid, messageParams)
      setNewMessage("")
      
      // Add message to display immediately
      const newMsg = {
        sender_id: 13545651, // Merchant user ID
        body: newMessage,
        date_sent: Math.floor(Date.now() / 1000)
      }
      setMessages(prev => [...prev, newMsg])
      
    } catch (err: any) {
      console.error('Error sending message:', err)
      setError(`Failed to send message: ${err.message}`)
    }
  }

  // Select a chat
  const selectChat = (chat: any) => {
    setSelectedChat(chat)
    loadMessages(chat._id)
  }

  // Load ConnectyCube SDK
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/connectycube@4/dist/connectycube.min.js'
      script.onload = () => {
        console.log('✅ ConnectyCube SDK loaded')
      }
      document.head.appendChild(script)
      
      return () => {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <Container className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Heading level="h2">💬 Live Chat Dashboard</Heading>
          {isConnected && (
            <Badge color="green" size="small">
              Connected
            </Badge>
          )}
        </div>
        
        {!isConnected && (
          <Button onClick={initializeChat} disabled={loading}>
            {loading ? "Connecting..." : "Connect to Chat"}
          </Button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <Text className="text-red-700 text-sm">{error}</Text>
        </div>
      )}

      {isConnected && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
          {/* Chat List */}
          <div className="lg:col-span-1 border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-3 border-b">
              <Text className="font-medium">Visitor Conversations ({chats.length})</Text>
            </div>
            
            <div className="overflow-y-auto h-80">
              {chats.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <Text>No visitor chats yet</Text>
                  <Text className="text-xs mt-1">Visitors will appear here when they start chatting</Text>
                </div>
              ) : (
                chats.map((chat) => (
                  <div
                    key={chat._id}
                    onClick={() => selectChat(chat)}
                    className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedChat?._id === chat._id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <Text className="font-medium text-sm">{chat.name}</Text>
                      {chat.unread_messages_count > 0 && (
                        <Badge color="red" size="small">
                          {chat.unread_messages_count}
                        </Badge>
                      )}
                    </div>
                    <Text className="text-xs text-gray-500 mt-1">
                      {chat.last_message || 'No messages yet'}
                    </Text>
                    <Text className="text-xs text-gray-400 mt-1">
                      {chat.last_message_date_sent 
                        ? new Date(chat.last_message_date_sent * 1000).toLocaleString()
                        : new Date(chat.created_at).toLocaleString()
                      }
                    </Text>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="lg:col-span-2 border rounded-lg overflow-hidden flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="bg-gray-50 p-3 border-b">
                  <Text className="font-medium">💬 {selectedChat.name}</Text>
                  <Text className="text-xs text-gray-500">
                    Chat with website visitor
                  </Text>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500">
                      <Text>No messages yet</Text>
                    </div>
                  ) : (
                    messages.map((message, index) => {
                      const isOwn = message.sender_id === 13545651 // Merchant user ID
                      return (
                        <div
                          key={index}
                          className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs px-3 py-2 rounded-lg ${
                              isOwn
                                ? 'bg-blue-500 text-white'
                                : 'bg-white border shadow-sm'
                            }`}
                          >
                            <Text className="text-sm">{message.body || message.message}</Text>
                            <Text className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                              {new Date((message.date_sent || Date.now() / 1000) * 1000).toLocaleTimeString()}
                            </Text>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>

                {/* Message Input */}
                <div className="border-t p-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                      Send
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Text>Select a conversation to start chatting</Text>
                  <Text className="text-xs mt-1">Choose a visitor from the left panel</Text>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isConnected && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <Text className="text-blue-700 text-sm">
            💡 <strong>Live Chat Active:</strong> You will receive real-time notifications when visitors send messages. 
            All visitor chats from your website will appear in the left panel.
          </Text>
        </div>
      )}
    </Container>
  )
}

// Widget configuration - show on dashboard
export const config = defineWidgetConfig({
  zone: "order.list.before", // Show on main dashboard/orders page
})

export default ChatDashboardWidget 