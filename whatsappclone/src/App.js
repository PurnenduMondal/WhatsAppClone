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
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
    })

    const channel = pusher.subscribe('messages')
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])

    })

//     return () => {
//       console.log("unsubscribe")
//       channel.unbind_all()
//       channel.unsubscribe()
//     }

    

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
