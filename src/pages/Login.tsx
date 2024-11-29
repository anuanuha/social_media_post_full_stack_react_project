import { signInWithPopup } from "firebase/auth"
import {auth, provider} from "../Config/Firebase"
import './Login.css'
export const Login=()=>{
    const SignInWithGoogle = async()=>{
            const result = signInWithPopup(auth,provider);
            console.log(result);
            
    }
    return(
        
        <div className="login-container">
      <p className="login-message">Sign in with Google</p>
      <button onClick={SignInWithGoogle} className="signin-button">
        Sign In
      </button>
    </div>
        
               
    )
}