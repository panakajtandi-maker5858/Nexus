import { initializeSocketConnection } from "../service/chat.socket.js"
import { sendMessage, getChats , getMessages , deleteChat } from "../service/chat.api.js"
import { setChats , setCurrentChatId , setError , setLoading , createNewChat , addMessages , addNewMessage , setStreamingMessage} from "../chat.slice.js"
import { useDispatch } from "react-redux"



export const useChat = ()=>{

const dispatch = useDispatch()

async function handleSendMessage({ message, chatId }) {
    try {
        dispatch(setLoading(true))

// FIRST STORE USER'S MESSAGE TO SHOW IN MESSAGE SCREEN  
        if (chatId) {
            dispatch(addNewMessage({
                chatId: chatId,
                content: message,
                role: "user",
            }))
        }

        const data = await sendMessage({ message, chatId })
        const { chat, aiMessage } = data

        if (!chatId)
            dispatch(createNewChat({
                chatId: chat._id,
                title: chat.title,
            }))

        // dispatch(addNewMessage({
        //     chatId: chatId || chat._id,
        //     content: message,
        //     role: "user",
        // }))
        dispatch(addNewMessage({
            chatId: chatId || chat._id,
            content: "",
            role: aiMessage.role,
        }))
        dispatch(setCurrentChatId(chatId || chat._id))

      dispatch(setLoading(false))

        // Typing effect of response by Ai :-
        const fullText = aiMessage.content
        const words = fullText.split(' ')
        let currentText = ''
        const currentChatId = chatId || chat._id

        await new Promise((resolve) => {
            let i = 0
            const interval = setInterval(() => {
                if (i >= words.length) {
                    clearInterval(interval)
                    // Final text set 
                    dispatch(setStreamingMessage({
                        chatId: currentChatId,
                        content: fullText,
                    }))
                    resolve()
                    return
                }
                currentText += (i > 0 ? ' ' : '') + words[i]
                dispatch(setStreamingMessage({
                    chatId: currentChatId,
                    content: currentText,
                }))
                i++
            }, 70) 
        })



    }
     catch (err) {
        dispatch(setError(err.message))
    } 
    finally {
        dispatch(setLoading(false)) 
    }
}

async function handleGetChats() {
    
dispatch(setLoading(true))
const data = await getChats()
const { chats } = data 
dispatch(setChats(chats.reduce((acc, chat) => {
            acc[ chat._id ] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt,
            }
            return acc
        }, {})))
        dispatch(setLoading(false))

}


 async function handleOpenChat(chatId, chats) {
        console.log(chats[ chatId ]?.messages.length)

        if (chats[ chatId ]?.messages.length === 0) {
            const data = await getMessages(chatId)
            const { messages } = data

            const formattedMessages = messages.map(msg => ({
                content: msg.content,
                role: msg.role,
            }))

            dispatch(addMessages({
                chatId,
                messages: formattedMessages,
            }))
        }
        dispatch(setCurrentChatId(chatId))
    }


    async function handleNewChat() {
        dispatch(setCurrentChatId(null))
    }




async function handleDeleteChat(chatId) {
    try {
        await deleteChat(chatId)
        dispatch(setCurrentChatId(null))
        await handleGetChats()
    } catch (err) {
        console.error("Delete failed:", err)
    }
}


 return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat ,
        handleNewChat ,
        handleDeleteChat
        
    }




}