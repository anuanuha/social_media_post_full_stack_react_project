import { Link } from "react-router-dom"
import {auth} from "../Config/Firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import './Navbar.css'
export const Navbar=()=>{
    const [user] = useAuthState(auth);
    const SignOut =async()=>{
        await signOut(auth);
    }
    return(
        <div className="navbar-container">
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          {!user ? (
            <Link to="/login" className="nav-link">Login</Link>
          ) : (
            <Link to="/createPost" className="nav-link">Create Post</Link>
          )}
        </div>
        <div className="user-info">
          {user && (
            <div>
              <p>{user?.displayName}</p>
              <img
                src={user?.photoURL || ""}
                alt="User Avatar"
                className="user-avatar"
              />
              <button onClick={SignOut} className="logout-button">Logout</button>
            </div>
          )}
        </div>
      </div>
    )
}