import React from 'react'

const NexusLogo = ({ size = 40 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="14" fill="#0a0d14"/>
      <rect x="8" y="8" width="36" height="36" rx="8" stroke="#31b8c6" stroke-width="1.5" fill="none" opacity="0.4"/>
      <text x="26" y="33" textAnchor="middle" fontSize="22" fontWeight="700" fill="#31b8c6" fontFamily="Georgia, serif" letterSpacing="-1">N</text>
    </svg>
  )
}

export default NexusLogo



