import React from 'react'

const DeleteChatModal = ({ onConfirm, onCancel }) => {
  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4'>
      <div className='bg-[#0d1117] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl'>
        
        {/* Icon */}
        <div className='w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4'>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
          </svg>
        </div>

        {/* Text */}
        <h2 className='text-lg font-semibold text-white text-center mb-1'>
          Delete Chat?
        </h2>
        <p className='text-white/40 text-sm text-center mb-6'>
          Are you sure you want to delete this chat? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className='flex gap-3'>
          <button
            onClick={onCancel}
            className='flex-1 rounded-xl border cursor-pointer border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='flex-1 rounded-xl cursor-pointer bg-red-500/90 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-500 transition'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteChatModal