import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore"; // Correct capitalization
import { auth, db } from "../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate()

  const schema = yup.object().shape({
    title: yup.string().required("you must add title"),
    description: yup.string().required("you must add description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/")
  };


  return (
    <form onSubmit={handleSubmit(onCreatePost)} className="create-form">
    <input
      placeholder="Title..."
      {...register("title")}
      className={errors.title ? "error" : ""}
      type="text"
    />
    <p className="error-message">{errors.title?.message}</p>
  
    <textarea
      placeholder="Description..."
      {...register("description")}
      className={errors.description ? "error" : ""}
    ></textarea>
    <p className="error-message">{errors.description?.message}</p>
  
    <input type="submit" value="Submit" />
  </form>
  
  );
};