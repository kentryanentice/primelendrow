import { useState } from 'react'
import axios from 'axios'
import '../css/chatbot.css'

const ChatBot = () => {
    const [userInput, setUserInput] = useState('')
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSendMessage = async () => {
        if (!userInput.trim()) return
        
        const newMessage = { role: 'user', content: userInput }
        setMessages([...messages, newMessage])
        setUserInput('')
        setLoading(true)

        try {
            const response = await axios.post(
                'http://localhost:3500/chat',
                { prompt: userInput },
                { headers: { 'Content-Type': 'application/json' } }
            )

            if (response.data?.message) {
                setMessages((prev) => [...prev, { role: 'ai', content: response.data.message[0].text }])
            }
        } catch (error) {
            console.error('Error fetching AI response:', error)
        } finally {
            setLoading(false)
        }
    }

    const renderMessageContent = (content) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g
    
        return content.split(urlRegex).map((part, index) =>
            part.match(urlRegex) ? (
                <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {part}
                </a>
            ) : (
                part
            )
        )
    }

    return (
    <>

        <div className="chat-icon"></div>

        <div className='chat-container'>
            <div className='chat-title'>Chat Engine</div>
            
            <div className='chat-box'>
                
            {messages.length > 0 ? (
                messages.map((msg, index) => (
                    <div key={index} className={`chat-role fadeInContent ${msg.role === 'user' ? 'text1' : 'text2'}`}>
                        {renderMessageContent(msg.content)}
                    </div>
                ))
            ) : (
                <div className='chat-fallback'>No messages yet. Start a conversation!</div>
            )}

            </div>

            <div className='chat-message'>

                <textarea type='text' className='chat-input' placeholder='Type your message...' value={userInput} onChange={(e) => setUserInput(e.target.value)} />

                <button onClick={handleSendMessage}  className='chat-button' disabled={loading}> {loading ? (<span className="animated-dots">
                    <span>Thinking</span><span className="dots"></span></span>) : (
                    <> <span>Send</span></>)}
                </button>

            </div>

        </div>
    
    </>
    )
}

export default ChatBot