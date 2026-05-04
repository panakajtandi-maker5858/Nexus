import React from "react";
import { Children } from "react";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router'
import NexusLogo from '../../chat/components/NexusLogo'


const Protected = ({children}) =>{
    
const user = useSelector(state => state.auth.user)
const loading = useSelector(state => state.auth.loading)


 if (loading) {
        return (
            <div className='min-h-screen bg-[#07090f] flex flex-col items-center justify-center gap-6'>
                
                {/* Logo */}
                <div style={{animation: 'pulse 2s infinite'}}>
                    <NexusLogo size={72} />
                </div>

                {/* Nexus name */}
                <h1 className='text-2xl font-semibold text-white tracking-tight'>
                    Nexus
                </h1>

                {/* Loading dots */}
                <div className='flex gap-2'>
                    <span className='w-2 h-2 bg-[#31b8c6] rounded-full animate-bounce' style={{animationDelay: '0ms'}}></span>
                    <span className='w-2 h-2 bg-[#31b8c6] rounded-full animate-bounce' style={{animationDelay: '150ms'}}></span>
                    <span className='w-2 h-2 bg-[#31b8c6] rounded-full animate-bounce' style={{animationDelay: '300ms'}}></span>
                </div>

                {/* Tagline */}
                <p className='text-white/30 text-sm'>
                    Powered by Gemini AI
                </p>

            </div>
        )
    }

if(!user){
    return <Navigate to="/login" replace />
}

return children


}

export default Protected