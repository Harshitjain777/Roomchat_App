import React, { useState, useRef } from 'react'
import { Auth } from "./components/Auth"
import Cookies from 'universal-cookie';
import Chat from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
  const signUserOut = async ()=>{
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }
  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth}></Auth>
      </div>
    );

  }
  return <>
    {room ?
      (
        
<>
        <Chat room={room}></Chat>
        
        
          </>
  
        

      ) : (
        <div style={{ display: 'flex', marginTop: '10%' }}>

          <div style={{
            border: '1px solid black', height: '100%', width: '50%', padding: '2%',
            boxShadow: "5px 5px 5px lightblue", margin: 'auto'
          }}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" style={{ fontFamily: 'sans-serif' }} className="form-label"><h1>Enter Room Name:</h1></label>
              <input ref={roomInputRef} type="text" className="form-control" />
            </div>
            <button onClick={() => setRoom(roomInputRef.current.value)} type="button" class="btn btn-dark">Enter Chat</button>
           


          </div>


        


        </div>
       
      )}
      <div style={{display:'flex' , justifyContent:'center'}}>
            <button onClick={signUserOut} style={{marginTop:'5%'}} type="button" class="btn btn-primary">Sign Out</button>
          </div>

  </>

}

export default App;
