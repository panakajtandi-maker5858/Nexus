import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import remarkGfm from 'remark-gfm'
import WelcomeScreen from '../components/WelcomeScreen'
import NexusLogo from '../components/NexusLogo'
import DeleteChatModal from "../components/DeleteChatModel"



const Dashboard = () => {
  const chat = useChat()
  const [chatInput, setChatInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const isLoading = useSelector((state) => state.chat.isLoading)
const [deleteChatId, setDeleteChatId] = useState(null)  



  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) return
    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats)
    setSidebarOpen(false)
  }

  const handleNewChat = () => {
    chat.handleNewChat()
    setSidebarOpen(false)
  }



  return (
    <main className='min-h-screen w-full bg-[#07090f] text-white flex'>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/60 z-20 md:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-30 md:z-auto
        h-full w-72 shrink-0 bg-[#080b12] 
        flex flex-col p-4 border-r border-white/10
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>

        {/* Logo */}
        <div className='flex items-center gap-2 mb-6'>
           <NexusLogo size={36} />
          <h1 className='text-xl font-semibold tracking-tight'>Nexus</h1>
        </div>

        {/* New Chat Button */}
        <button
          onClick={handleNewChat}
          className='w-full mb-4 cursor-pointer flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition'
        >
          <span className='text-lg'>+</span>
          New Chat
        </button>

        {/* Your Chats Label */}
<p className='text-xs font-medium text-white/30 uppercase tracking-widest mb-2 px-1'>
  Your Chats
</p>

        {/* Chat List */}
        <div className='flex-1 overflow-y-auto space-y-1 slidebar-chats'>
          {Object.values(chats).map((c, index) => (
  <div
    key={index}
    className='group relative'
  >
    <button
      onClick={() => openChat(c.id)}
      type='button'
      className={`w-full cursor-pointer rounded-xl px-3 py-2.5 text-left text-sm font-medium transition pr-8
        ${currentChatId === c.id
          ? 'bg-white/10 text-white'
          : 'text-white/60 hover:bg-white/5 hover:text-white'
        }`}
    >
      <p className='truncate'>{c.title}</p>
    </button>

    {/* Delete button — hover pe dikhega */}
    <button
      onClick={(e) => {
        e.stopPropagation()
        setDeleteChatId(c.id)
      }}
      className='absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 transition text-white/40 hover:text-red-400'
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
        <path d="M10 11v6M14 11v6"/>
        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
      </svg>
    </button>
  </div>
))}
        </div>

        {/* Bottom branding */}
        <div className='mt-4 pt-4 border-t border-white/10'>
          <p className='text-xs text-white/20 text-center'>Nexus AI — Powered by Gemini</p>
        </div>
      </aside>

      {/* Main Chat Area */}
      <section className='flex-1 flex flex-col h-screen relative overflow-hidden'>

        {/* Top Bar — Mobile */}
        <header className='flex items-center gap-3 px-4 py-3 border-b border-white/10 md:hidden'>
          <button
            onClick={() => setSidebarOpen(true)}
            className='p-2 rounded-lg hover:bg-white/10 transition'
          >
            ☰
          </button>
          <div className='flex items-center gap-2'>
             <NexusLogo size={28} />
            <span className='font-semibold'>Nexus</span>
          </div>
        </header>

        {/* Messages */}
        <div className='messages flex-1 overflow-y-auto px-4 py-6 space-y-4 pb-36 flex flex-col'
        style={{paddingBottom: '100px'}}>
        

          {/* Empty state */}
{!currentChatId && (
  <div className='flex flex-col items-center justify-center h-full gap-3 text-center'>
    <div className='w-16 h-16 rounded-2xl bg-gradient-to-br...'>
      N
    </div>
    <h2 className='text-2xl font-semibold'>Welcome to Nexus</h2>
    <p className='text-white/40 text-sm max-w-xs'>
      Ask me anything...
    </p>
  </div>
)}

          {chats[currentChatId]?.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* AI Avatar */}
              {message.role === 'ai' && (
                <div className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#31b8c6] to-[#1a7a85] flex items-center justify-center text-xs font-bold mr-2 mt-1 shrink-0'>
                  N
                </div>
              )}

              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm md:text-base ${
                message.role === 'user'
                  ? 'bg-[#31b8c6]/20 border border-[#31b8c6]/30 text-white rounded-br-none'
                  : 'text-white/90'
              }`}>
                {message.role === 'user' ? (
                  <p>{message.content}</p>
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                      ul: ({ children }) => <ul className='mb-2 list-disc pl-5'>{children}</ul>,
                      ol: ({ children }) => <ol className='mb-2 list-decimal pl-5'>{children}</ol>,
                      code: ({ children }) => <code className='rounded bg-white/10 px-1 py-0.5 text-[#31b8c6]'>{children}</code>,
                      pre: ({ children }) => <pre className='mb-2 overflow-x-auto rounded-xl bg-black/30 p-3'>{children}</pre>
                    }}
                    remarkPlugins={[remarkGfm]}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className='flex justify-start items-center gap-2'>
              <div className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#31b8c6] to-[#1a7a85] flex items-center justify-center text-xs font-bold shrink-0'>
                N
              </div>
              <div className='flex gap-1 px-4 py-3'>
                <span className='w-2 h-2 bg-[#31b8c6] rounded-full animate-bounce' style={{animationDelay: '0ms'}}></span>
                <span className='w-2 h-2 bg-[#31b8c6] rounded-full animate-bounce' style={{animationDelay: '150ms'}}></span>
                <span className='w-2 h-2 bg-[#31b8c6] rounded-full animate-bounce' style={{animationDelay: '300ms'}}></span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <footer className=' shrink-0 bottom-0 left-0 right-0 p-4 bg-[#07090f] border-t border-white/10'>
          <form
            onSubmit={handleSubmitMessage}
            className='max-w-3xl mx-auto flex gap-2'
          >
            <input
              type='text'
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder='Ask Nexus anything...'
              disabled={isLoading}
              className='flex-1 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-base text-white outline-none transition placeholder:text-white/30 focus:border-[#31b8c6]/50 focus:bg-white/8 disabled:opacity-50'
            />
            <button
              type='submit'
              disabled={!chatInput.trim() || isLoading}
              className='rounded-xl bg-[#31b8c6] px-5 py-3 font-semibold text-zinc-950 transition hover:bg-[#45c7d4] disabled:opacity-40 disabled:cursor-not-allowed'
            >
              Send
            </button>
          </form>
          <p className='text-center text-xs text-white/20 mt-2'>
            Nexus can make mistakes. Verify important information.
          </p>
        </footer>

           {deleteChatId && (
        <DeleteChatModal
          onCancel={() => setDeleteChatId(null)}
          onConfirm={async () => {
            await chat.handleDeleteChat(deleteChatId)
            setDeleteChatId(null)
          }}
        />
      )}
      </section>
    </main>
  )
}

export default Dashboard