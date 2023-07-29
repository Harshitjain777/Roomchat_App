import React from 'react'
import { auth , provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import chaticon from '../assets/chaticon.png'
import Cookies from 'universal-cookie';
const cookies=new Cookies();


export const Auth=(props)=> {
    
   const {setIsAuth}=props;
 
  const signInWithGoogle= async () =>{
    try {
      const result=await signInWithPopup(auth,provider);
      cookies.set("auth-token" , result.user.refreshToken);  //we use cookie becoz if we refresh the page the user will still be logged in but if we dont use cookie everytime we refreash the page the user will automatically logged out
      setIsAuth(true);
      
    } catch (error) {
      console.log(error);
    }
      
  }



  return (
  
    <div style={{display:"flex" , justifyContent:'center' , marginTop:'5%'}}>
    

    <div className="card" style={{width:"30%"}}>
  <img src={chaticon} style={{width:'100%',height:'80%'}} className="card-img-top" alt="..."/>
  <div className="card-body" style={{margin:'auto'}}>
    <h5 className="card-text">Sign In With Google To Continue</h5>
    <button style={{marginLeft:'21%'}} className="btn btn-primary" onClick={signInWithGoogle}>Sign In With Google</button>
   
  </div>
</div>
    </div>
  )
}

