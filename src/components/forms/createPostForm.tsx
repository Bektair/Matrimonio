import { useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Markdown from "react-markdown";
import Select from 'react-select';
import { IPostCreate } from "../../API/CreatePost";
import { IPostUpdate, IPostUpdateTranslation, PostUpdateRequest } from "../../API/UpdatePost";
import { ImageRoles } from "../../constants/imageRoles";
import { IPost } from "../../models/IPost";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks/hooks";
import { selectAuth } from "../../redux/selectors/selectAuth";
import { selectLanguage } from "../../redux/selectors/selectLanguage";
import { selectWedding } from "../../redux/selectors/selectWeddingSlice";
import { createPostInWedding, updatePostThunk } from "../../redux/slices/weddingSlice";
import './createPostForm.sass';

interface IProps {
    post : IPost | undefined
} 

function CreatePostForm({post} : IProps) {
    const dispatch = useAppDispatch();
    const AuthorId = useAppSelector(selectAuth).dbId;
    const WeddingId = useAppSelector(selectWedding)?.id;
    const Language = useAppSelector(selectLanguage).language;
    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            title: post?.title,
            body: post?.body,
            images: post?.images.map((s)=> {console.log(s); return { uri: s.uri, role: {value: s.role, label: s.role}}})

            // [

            //     { uri: "testy", role: {value: ImageRoles.MainImage.toString(), label: ImageRoles.MainImage.toString()} },
            //     { uri: "tsesty", role: {value: ImageRoles.MainImage.toString(), label: ImageRoles.MainImage.toString()} }
            // ]
        }
    });
    const imageRoles = Object.values(ImageRoles).map((s)=> {return {value: s, label: s.toString()}})
    const [titleMarkdown, setTitleMarkDown] = useState(post?.title ?? "");
    const [bodyMarkdown, setBodyMarkDown] = useState(post?.body ?? "");
    const [previousId, setPreviousId] = useState("");




    const { fields, append, remove} = useFieldArray({
        control,
        name: "images",
    
    })

    
    const isInitalrender = useRef(true);
    

    useEffect(()=>{
        console.log("POST.<...............")
        console.log(post?.images)
        console.log(post?.images.map((s)=> {console.log(s); return { uri: s.uri, role: {value: s.role, label: s.role}}}))
        if(isInitalrender.current) isInitalrender.current = false
        else{
            if(post){
                console.log(previousId)
                console.log(post.id)
                if(previousId == post?.id.toString())
                    alert("Post has been updated :)")
                else
                    setPreviousId(post?.id.toString())
            }
        } 

    }, [post])

    function CreatePostForm (formData : any, e : any){
        console.log("FORMDATAPOSTREATE_----------------------")
        console.log(formData)


        var images = formData.images.map(
            (img : any)=>{
                return {uri: img.uri, role: img.role.value}
            });
        console.log(images);

        if(e.nativeEvent.submitter.name == "Update"){
            if(post){
                var postTranslation = {
                    Body: formData.body,
                    Title: formData.title,                     
                } as IPostUpdateTranslation

                var postUpdate = {
                    Images: formData.images.map((img : any)=>{
                        return {uri: img.uri, role: img.role.value}
                    }),
                    Translation: postTranslation
                } as IPostUpdate

                var Request = {
                    update: postUpdate,
                    id: post.id,
                    Language: Language
                } as PostUpdateRequest

                dispatch(updatePostThunk(Request))
            }
        }else {
            var postCreate = {
            AuthorId: AuthorId,
            WeddingId: WeddingId?.toString(),
            Body: formData.body,
            Images: formData.images.map((img : any)=>{
                return {uri: img.uri, role: img.role.value}
            }),
            Title: formData.title,
            Language: Language,
            IsDefaultLanguage: true
            } as IPostCreate

            console.log(postCreate)
            dispatch(createPostInWedding(postCreate))
        }
    }
    

  return (
    <form onSubmit={handleSubmit(CreatePostForm)}>
        <ul>
            <input {...register(`title`)} placeholder="title" onChange={(e) => setTitleMarkDown(e.target.value)} defaultValue={post?.title ?? ""}/>
            <textarea {...register(`body`)} placeholder="body" onChange={(e) => setBodyMarkDown(e.target.value)} defaultValue={post?.body ?? ""}/>
            {fields.map((field, index) => (
                <li key={field.id}>
                    <textarea {...register(`images.${index}.uri`)}/>
                    <Controller render={({ field : { onChange, value } }) => 
                            <Select
                                name="allergens"
                                options={imageRoles}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={onChange}
                                placeholder='Select Role'
                                value={value}
                            />
                        }
                        name={`images.${index}.role`}
                        control={control}
                    />
                    <button type="button" onClick={()=> remove(index)}>Delete</button>
                </li>
            ))}
            <Markdown>{"## "+titleMarkdown +"  \n" + bodyMarkdown}</Markdown>
            <label>MainImage</label>
            <img className="imagePreview" src={post?.images.find((img)=>img.role == ImageRoles.MainImage)?.uri}/>
            <label>SideImage</label>
            <img className="imagePreview" src={post?.images.find((img)=>img.role == ImageRoles.SideImage)?.uri}/>
        </ul>
        <div>
            <button type="button" onClick={()=>append({ uri: "http://test.com", role: { value: ImageRoles.None, label: ImageRoles.None}})}>AddImage</button>
            { post  &&<button type="submit" name='Update'>Update</button>}
            <button type="submit" name='AddNew'>Create</button>
        </div>
    </form>
  )
}

export default CreatePostForm