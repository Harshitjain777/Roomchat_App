import React, { useEffect, useState } from 'react'
import { db , auth } from '../firebase-config';

import {addDoc, 
  collection, 
  onSnapshot, 
  orderBy, 
  query, 
  serverTimestamp, 
  where,
  } from 'firebase/firestore'


function Chat(props) {
   const {room}=props;
   const [messages , setMessages]=useState([]);
   const [newMessage , setNewMessage]=useState("");
   const messagesRef=collection(db , "messages");

   useEffect(()=>{
    const queryMessages=query(messagesRef , where("room","==" , room) , orderBy("createdAt"));

    const unsuscribe=onSnapshot(queryMessages , (snapshot)=>{
          let messages=[];
         snapshot.forEach((doc)=>{
           messages.push({...doc.data() , id: doc.id});
         });
         setMessages(messages);
    })

    return ()=>unsuscribe();
   } , []);
   const handleSubmit= async (e)=>{
         e.preventDefault();
         if(newMessage=="") return;

         await addDoc(messagesRef , {
            text:newMessage,
            createdAt:serverTimestamp(),
            user:auth.currentUser.displayName,
            room,

         })

         setNewMessage("");


   }

  return (
    <div className="container-fluid" style={{border:'2px solid black' , width:'50%' , marginTop:'2%' , marginBottom:'2%' , boxShadow: '2px 2px 2px 2px #85cfe6'}} >
    
    <div style={{  display:'flex',justifyContent:'center' , marginTop:'2%' , marginBottom:'2%' , border:'2px solid cyan' , backgroundColor:'#85cfe6'}}>
      <h1 style={{fontFamily:'fantasy'}}>Welcome to : {room}</h1>
    </div>
    <div>
      {messages.map((message)=>(
        <div key={message.id}> <span style={{fontSize:'120%' , fontWeight:'bolder'}}>{message.user}:</span> <span>{message.text}</span>
        
        </div>
      ))
       }
    </div>
      <form  onSubmit={handleSubmit} className='new-message-from'>
      <input style={{marginTop:'1%'}} type="text" className="form-control" placeholder='type your message here...' onChange={(e)=>setNewMessage(e.target.value)}
        value={newMessage}></input>
      <button style={{marginTop:'2%' , marginBottom:'2%'}} type="submit" class="btn btn-dark">Send Message</button>

      </form>
  </div>
    
  )
}

export default Chat