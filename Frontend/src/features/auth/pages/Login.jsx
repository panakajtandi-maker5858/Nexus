import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'






const Login = ()=>{
const [ email , setEmail] = useState('')
const [ password , setPassword] = useState('')
   const [loginError, setLoginError] = useState(null)
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [showPassword, setShowPassword] = useState(false)




const user = useSelector(state => state.auth.user)
const loading = useSelector(state => state.auth.loading)
const { handleLogin } = useAuth()
const navigate = useNavigate()


const submitForm = async (event) => {
    event.preventDefault()
    setLoginError(null)
    setIsSubmitting(true)

    const result = await handleLogin({ email, password })
    setIsSubmitting(false)

    if (result?.notVerified) {
        setLoginError("Please verify your email before logging in!")
        setTimeout(() => setLoginError(null), 5000)
        return
    }

    if (result?.success) {
        navigate("/")
    } else {
        setLoginError("Invalid email or password!")
        setTimeout(() => setLoginError(null), 5000)
    }
}


 


if(!loading && user){
    return  <Navigate to="/" replace />
}

return (

<section className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[85vh] w-full max-w-5xl items-center justify-center">
                <div className="w-full max-w-md rounded-2xl border border-[#31b8c6]/40 bg-zinc-900/70 p-8 shadow-2xl shadow-black/50 backdrop-blur">
                    <h1 className="text-3xl font-bold text-[#31b8c6]">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-zinc-300">
                        Sign in with your email and password.
                    </p>



                    {/* Error Message */}
{loginError && (
    <div className='mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 flex items-center gap-2'>
        <span></span>
        {loginError}
    </div>
)}



                    <form onSubmit={submitForm} className="mt-8 space-y-5">
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-200">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-zinc-100 outline-none ring-0 transition focus:border-[#31b8c6] focus:shadow-[0_0_0_3px_rgba(49,184,198,0.25)]"
                            />
                        </div>

                        <div>
  <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-200">
    Password
  </label>
  <div className="relative">
    <input
      id="password"
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      placeholder="Enter your password"
      required
      className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 pr-12 text-zinc-100 outline-none ring-0 transition focus:border-[#31b8c6] focus:shadow-[0_0_0_3px_rgba(49,184,198,0.25)]"
    />
    {/* Show/Hide button */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute  cursor-pointer right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition"
    >
      {showPassword ? (
        // Eye Off icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
      ) : (
        // Eye icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      )}
    </button>
  </div>
</div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full cursor-pointer rounded-lg bg-[#31b8c6] px-4 py-3 font-semibold text-zinc-950 transition hover:bg-[#45c7d4] focus:outline-none focus:shadow-[0_0_0_3px_rgba(49,184,198,0.35)]"
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-zinc-300">
                        Don&apos;t have an account?{' '}
                        <Link to="/register" className="font-semibold text-[#31b8c6] transition hover:text-[#45c7d4]">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </section>

)

}

export default Login 