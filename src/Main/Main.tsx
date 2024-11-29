import { getDocs, collection } from "firebase/firestore";
import { db } from "../Config/Firebase";
import { useEffect, useState } from "react";
import { Post } from "./Post";
import './Main.css'

export interface IPost { // Renamed Post type to IPost
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}

export const Main = () => {
    const postRef = collection(db, "posts");
    const [postList, setPostList] = useState<IPost[] | null>(null); // Renamed setter to setPostList

    const getPost = async () => {
        const data = await getDocs(postRef);
        const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[];
        setPostList(posts); // Now using the state setter to update the postList
        console.log(posts);
    };

    useEffect(() => {
        getPost();
    });

    return (
        <div className="main-container">
        {postList?.map((post) => (
            <Post post={post} key={post.id} />
        ))}
    </div>
    );
};