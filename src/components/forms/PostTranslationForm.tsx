import { useForm } from "react-hook-form";
import { IPost } from "../../models/IPost"
import { useAppDispatch, useAppSelector } from "../../redux/Hooks/hooks";
import { selectLanguage } from "../../redux/selectors/selectLanguage";
import { addPostTranslationThunk } from "../../redux/slices/weddingSlice";

interface IProps {
    post : IPost
} 

function PostTranslationForm({post} : IProps) {
    const { register, handleSubmit } = useForm();
    const dispatch = useAppDispatch();
    const language = useAppSelector(selectLanguage).language;


    function AddTranslation(formdata : any, e: any){

        console.log(formdata)


        dispatch(addPostTranslationThunk({postId: post.id.toString(), translation: {
            body: formdata.body,
            title: formdata.title,
            isDefaultLanguage: false,
            language: language
        } }))

    }

  return (
    <>
        <form onSubmit={handleSubmit(AddTranslation)}>
            <label>Title
            <input {...register("title")} type="text" /></label>
            <label>Body
            <textarea {...register("body")}/></label>
            <button type="submit">AddTranslation</button>
        </form>
    </>
  )
}

export default PostTranslationForm