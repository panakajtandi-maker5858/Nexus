import React from 'react'
import NexusLogo from "./NexusLogo"

const suggestions = [
  "What's happening in the world today?",
  "Explain quantum computing simply",
  "What is the current Bitcoin price?",
  "Help me write a professional email",
]

const WelcomeScreen = ({ onSuggestionClick }) => {
  return (
    <div className='flex flex-col items-center justify-center flex-1 gap-10 px-4 text-center'>

      {/* Logo + Title */}
      <div className='flex flex-col items-center gap-5 special'>
        <NexusLogo size={72} />
        <div>
          <h1 className='text-4xl sm:text-5xl font-semibold text-white tracking-tight'>
            How can I help you?
          </h1>
          <p className='text-white/40 text-base sm:text-lg mt-2'>
            Powered by Gemini AI + Real-time Internet Search
          </p>
        </div>
      </div>

      {/* Suggestion Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl'>
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className='text-left rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm sm:text-base text-white/60 hover:bg-white/10 hover:text-white hover:border-[#31b8c6]/30 transition cursor-pointer'
          >
            {suggestion}
          </button>
        ))}
      </div>

    </div>
  )
}

export default WelcomeScreen