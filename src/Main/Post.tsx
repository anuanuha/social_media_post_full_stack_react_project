import { addDoc, collection,query, where ,getDocs, deleteDoc, doc} from "firebase/firestore";
import { IPost } from "./Main"; // Using renamed IPost
import { auth, db } from "../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import './Post.css'

interface Props {
    post: IPost; // Updated to use IPost type
}
interface Like{
    likeId: string;
    userId : string;
}

export const Post = (props: Props) => {
    const [likes, setLikes] = useState<Like[]| null>(null)
    const { post } = props;
    const [user] = useAuthState(auth);
    const likesRef = collection(db, "likes");

      const likesDoc = query(likesRef,where("postId", "==", post.id))
      const getLikes = async ()=>{
       const data = await getDocs(likesDoc);
       setLikes(data.docs.map((doc)=>({userId:doc.data().userId, likeId: doc.id})));
       
      }
      useEffect(()=>{
        getLikes();
      },[])
  const addLike = async () => {
    try{
   const newDoc = await addDoc(likesRef, {userId:user?.uid, postId:post.id}); 
    if(user){
    setLikes((prev)=>prev ? [...prev,{userId:user.uid, likeId: newDoc.id}]: [{userId:user.uid, likeId: newDoc.id}]);
    }
  }

catch(err){
console.log(err);
}
  }
  const removeLike = async () => {
    try{
        const likeToDeleteQuery = query(
            likesRef,
            where("postId", "==", post.id),
            where("userId", "==", user?.uid)
        )
        const likeToDeleteData = await getDocs(likeToDeleteQuery);
        const likeId = likeToDeleteData.docs[0].id;
        const likeToDelete = doc(db, "likes", likeId);
        await deleteDoc(likeToDelete);
    await addDoc(likesRef, {userId:user?.uid, postId:post.id}); 
    if(user){
    setLikes((prev)=>prev && prev.filter((like)=>like.likeId === likeId));
    }
  }

catch(err){
console.log(err);
}
  }
  const hasUserLiked = likes?.find((like)=>like.userId !== user?.uid)
    return (
        <div className="post-container">
            <div className="post-header">
                <h1 className="post-title">{post.title}</h1>
            </div>
            <div className="post-content">
                <p className="post-description">{post.description}</p>
            </div>
            <div className="post-footer">
                <p className="post-username">@{post.username}</p>
                <button className="post-like-button" onClick={hasUserLiked ? removeLike : addLike}>
                    {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
                </button>
                {likes && <p className="post-likes-count">Likes: {likes.length}</p>}
            </div>
        </div>
    );
};
