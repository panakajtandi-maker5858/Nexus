import React from 'react'
import { Link } from 'react-router'
import NexusLogo from '../../chat/components/NexusLogo'

const NotFound = () => {
  return (
    <div className='min-h-screen bg-[#07090f] flex flex-col items-center justify-center gap-6 text-white px-4'>
      
      <NexusLogo size={64} />

      <div className='text-center'>
        <h1 className='text-8xl font-bold text-[#31b8c6] mb-2'>404</h1>
        <h2 className='text-2xl font-semibold mb-2'>Page Not Found</h2>
        <p className='text-white/40 text-sm max-w-xs'>
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <Link
        to="/"
        className='rounded-xl bg-[#31b8c6] px-6 py-3 font-semibold text-zinc-950 transition hover:bg-[#45c7d4]'
      >
        Go Home
      </Link>

    </div>
  )
}

export default NotFound