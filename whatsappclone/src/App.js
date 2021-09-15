import React, { useEffect, useState } from 'react'
import './App.css'
import Chat from './Chat'
import Sidebar from './Sidebar'
import Pusher from 'pusher-js'
import axios from './axios.js'

function App() {

  const [messages, setMessages] = useState([])

  useEffect(()=>{
    axios.get('/messages/sync')
    .then(res => {
      setMessages(res.data)
    })
  }, [])
 

  useEffect(() => {
    const pusher = new Pusher("23549351ebb1868dd70b", {
      cluster: "ap2"
    })

    const channel = pusher.subscribe('messages')
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }

  }, [messages])
  

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
          <Chat messages = {messages}/>
      </div> 
    </div>
  );
}

export default App;
