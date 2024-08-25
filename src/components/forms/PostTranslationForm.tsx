import { useForm } from "react-hook-form";
import { IPost } from "../../models/IPost";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks/hooks";
import { selectLanguage } from "../../redux/selectors/selectLanguage";
import { addPostTranslationThunk } from "../../redux/slices/weddingSlice";
import { useState } from "react";
import Markdown from "react-markdown";

interface IProps {
    post : IPost
} 

function PostTranslationForm({post} : IProps) {
    const { register, handleSubmit } = useForm();
    const dispatch = useAppDispatch();
    const language = useAppSelector(selectLanguage).language;
    const [bodyMarkdown, setBodyMarkDown] = useState("");


    function AddTranslation(formdata : any, e : any){

        console.log(formdata)
        dispatch(addPostTranslationThunk({postId: post.id.toString(), 
            update: e.nativeEvent.submitter.name == "Update" ? true : false,                
            translation: {
            body: formdata.body,
            title: formdata.title,
            isDefaultLanguage: false,
            language: language,
        } }))
    }

  return (
    <>
        <form onSubmit={handleSubmit(AddTranslation)}>
            <label>Title
            <input {...register("title")} type="text" defaultValue={post.title} /></label>
            <label>Body
            <textarea {...register("body")} onChange={(e)=>setBodyMarkDown(e.target.value)} defaultValue={post.body}/></label>
            <div>
                <button type="submit" name='Update'>UpdateTranslation</button>
                <button type="submit" name='Translate'>AddTranslation</button>
            </div>
        </form>
        <Markdown>{bodyMarkdown}</Markdown>
    </>
  )
}

export default PostTranslationForm