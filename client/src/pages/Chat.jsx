import React from 'react'
import { useState } from 'react';
import '../normal.css'
import '../App.css'
const Chat = () => {
  const [input, setInput] = useState("");
  const [chatLog, setChatlog] = useState([{
    user:"gpt",
    message:"How can Capgemini A.I help you today?"
  }]);
//clear chats
function clearChat(){
  setChatlog([]);   
}
  async function handleSubmit(e) {
    e.preventDefault();
let chatLogNew = [...chatLog, {user:"me", message: `${input}`}]
    setInput("");
    setChatlog(chatLogNew)

    const messages = chatLogNew.map((message) => message.message).join("\n")

    //fetch response to the api 
const response = await fetch("http://localhost:3080/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: messages
  })
})

const data = await response.json();
setChatlog([...chatLogNew, { user: "gpt", message: `${data.message}`}])
  }
  return (
    <div className='chat-page'>
    <aside className='side-menu'>
<div className='side-menu-button' onClick={clearChat}><span>+</span> New Chat</div>
    </aside>

    <section className='chat-box'>
      <div className='chat-log'>
       {chatLog.map((message,index)=>(
        <ChatMessage key={index} message = {message} />
       ))}
     
      </div>

      <div className='chat-input-holder'>
        <form onSubmit={handleSubmit}>
        <input className='chat-input-textarea'  rows="1" value={input} onChange={(e)=> setInput(e.target.value)} ></input>
        </form>
      </div>

    </section>
    </div>
  )
}

const ChatMessage = ({message}) => {
  return (
    <div className={`chat-message ${message.user == "gpt" && "chatgpt"}`}>
    <div className='chat-message-center'>
    <div className= {`avatar ${message.user == "gpt" && "chatgpt"}`}>
    {message.user == "gpt" && <svg
    width={41}
    height={41}
    viewBox="0 0 256 260"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    
  >
    <title>{"OpenAI"}</title>
    <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" />
  </svg>}
   </div>
   
    <div className='message'>{message.message}</div>
  </div>
 </div>
  )
}

export default Chat