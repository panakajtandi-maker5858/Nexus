import React from 'react'
import { RouterProvider } from 'react-router'
import { useAuth } from "../features/auth/hook/useAuth"
import { useEffect } from "react"
import { router } from './app.routes'


function App(){
    const auth = useAuth()

    useEffect(()=>{
        auth.handleGetMe()
    },{})

return (
    <RouterProvider router={router} />
)


}


export default App